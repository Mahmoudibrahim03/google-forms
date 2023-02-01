import { Component, OnInit, Inject } from '@angular/core';
import { questionsTypes } from 'src/app/core/enums/questionsTypes.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inputs-element-builder',
  templateUrl: './inputs-element-builder.component.html',
  styleUrls: ['./inputs-element-builder.component.scss']
})
export class InputsElementBuilderComponent implements OnInit {

  public questionsTypes = questionsTypes;
  public labelName: string = '';
  public hint: string = '';
  public optionsList: string[] = [""];
  public questionCreator: FormGroup = new FormGroup({});
  public optionsCreator: FormGroup = new FormGroup({});
  public inputType: string = '';

  constructor(
    public dialogRef: MatDialogRef<InputsElementBuilderComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.questionCreator = this.fb.group({
      label: new FormControl(null, Validators.required),
      hint: new FormControl(null),
      inputType: new FormControl(null, Validators.required),
    })

    this.optionsCreator = this.fb.group({
      option1: new FormControl(null, Validators.required),
    })

    if (this.data) {
      this.questionCreator.patchValue({
        label: this.data?.label,
        hint: this.data?.hint,
        inputType: this.data?.type,
      })
      this.optionsCreator = this.fb.group({});
      this.optionsList = this.data.options;
      this.optionsList.forEach((option, index) => {
        let controlName = `option${index + 1}`;
        console.log(`option${index + 1}`, option);
        this.optionsCreator.addControl(controlName, new FormControl(option, Validators.required));
      })
    }
  }

  public save() {
    console.log(this.optionsCreator.value)
    let options = [];
    for (const key in this.optionsCreator.value) {
      if (this.optionsCreator.value[key]) {
        options.push(this.optionsCreator.value[key])
      }
    }
    this.dialogRef.close({
      ...this.questionCreator.value,
      options
    });
  }

  public close() {
    this.dialogRef.close();
  }

  public removeOption(index: number) {
    this.optionsList.splice(index, 1);
    this.optionsCreator.removeControl(`option${index + 1}`);
  }

  public addOption() {
    this.optionsCreator.addControl(`option${this.optionsList.length + 1}`, new FormControl(null, Validators.required));
    this.optionsList.push("");
  }
}
