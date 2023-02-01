import { FormsCrudService } from "./../../core/services/forms-crud.service";
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InputsElementBuilderComponent } from '../_modals/inputs-element-builder/inputs-element-builder.component';
import { ActivatedRoute } from '@angular/router';
import { questionResInterface } from 'src/app/core/interfaces/form.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionCrudService } from 'src/app/core/services/question-crud.service';
import { AnswersCrudService } from 'src/app/core/services/answers-crud.service';
import { ConfirmationModalComponent } from 'src/app/shared/_modals/confirmation-modal/confirmation-modal.component';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})

export class FormUserComponent implements OnInit {

  private readonly _id = this.route.snapshot.params['id'];

  public generatedForm = new FormGroup({});
  public inputs: questionResInterface[] = [];
  public formtitle: string = '';
  public isAdmin: boolean = false;

  constructor(
    private formService: FormsCrudService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private questionService: QuestionCrudService,
    private answerService: AnswersCrudService
  ) {
    this.generatedForm = this.fb.group({});
  }

  //add form cotnrol to form group
  private addFormControl(questionsArr: any[]) {
    questionsArr.forEach((inp) => {
      this.generatedForm.addControl(`${this._id}_${inp.label?.replace(/ /g, '_')}`, this.fb.control(null, Validators.required));
    });
  }

  // 
  private removeControlFE(inputObj: any) {
    this.inputs.splice(this.inputs.indexOf(inputObj), 1);
    this.generatedForm.removeControl(`${this._id}_${inputObj.label.replace(/ /g, '_')}`);
  }

  //
  private addCotnrolFe(questionObj: any, oldQuestionObj: any) {
    const formControlName = `${this._id}_${questionObj?.label.replace(/ /g, '_')}`;
    const newQuestionObj = {
      formId: this._id,
      type: questionObj?.inputType,
      label: questionObj?.label,
      placeholder: questionObj?.placeholder,
      options: questionObj?.options,
      formControlName,
      hint: questionObj?.hint
    };
    this.inputs.push(newQuestionObj);
    this.generatedForm.addControl(formControlName,
      this.fb.control(null, Validators.required));

    if (oldQuestionObj.id) {
      this.questionService.delete(oldQuestionObj.id).subscribe()
      this.questionService.create(newQuestionObj).subscribe();
    } else {
      const targetIndex = this.inputs.findIndex((inp) => inp === oldQuestionObj);
      this.inputs.splice(targetIndex, 1);
      this.inputs.push(newQuestionObj)
    }
  }

  // get form questions from DB 
  private getFormQuestions() {
    this.formService.getById(this._id).subscribe({
      next: (data: any) => {
        this.inputs = data.questions;
        this.formtitle = data.id;
        this.addFormControl(this.inputs);
      }
    });
  }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isLogged') === "true";
    // console.log(this.isAdmin);
    this.getFormQuestions();
  }

  // open dialog to add new input
  public newQuestionModal() {
    const dialogRef = this.dialog.open(InputsElementBuilderComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const newQuestionObj = {
          formId: this._id,
          type: result?.inputType,
          label: result?.label,
          placeholder: result?.placeholder,
          options: result?.options,
          formControlName: `${this._id}_${result?.label.replace(/ /g, '_')}`,
          hint: result?.hint
        }

        this.inputs.push(newQuestionObj);
        this.generatedForm.addControl(`${this._id}_${result?.label.replace(/ /g, '_')}`,
          this.fb.control(null, Validators.required));


      }

    });
  }

  // delete questions
  public deleteQuestion(inputObj: any) {
    this.dialog.open(ConfirmationModalComponent).afterClosed()
      .subscribe(result => {
        if (!result) {
          return;
        } else {
          //remove from FE
          this.generatedForm.removeControl(`${this._id}_${inputObj.label.replace(/ /g, '_')}`);
          this.inputs.splice(this.inputs.indexOf(inputObj), 1);

          //remove from BE
          //check if question has id from DB
          this.questionService.delete(inputObj.id).subscribe();
        }
      })
  }

  //edit question 
  public editQuestion(inputObj: any) {
    const dialogRef = this.dialog.open(InputsElementBuilderComponent, {
      data: inputObj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.removeControlFE(inputObj);
      this.addCotnrolFe(result, inputObj);
    });
  }

  // submit form to database
  public submitAnswers() {
    console.log(this.generatedForm);

    this.inputs.forEach((inp) => {
      let answerObj = {
        formId: this._id,
        questionId: 0,
        value: ""
      }
      const cotnrolName = `${this._id}_${inp.label.replace(/ /g, '_')}`;
      answerObj.questionId = inp.id as number;
      answerObj.value = this.generatedForm.get(cotnrolName)?.value;
      this.answerService.create(answerObj).subscribe();
    });

  }

  public finishForm() {
    this.inputs.forEach((inp) => {
      if (!inp.id) {
        this.questionService.create(inp).subscribe();
      }
    });
  }

}
