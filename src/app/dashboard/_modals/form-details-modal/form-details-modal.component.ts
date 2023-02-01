import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsCrudService } from 'src/app/core/services/forms-crud.service';

@Component({
  selector: 'app-form-details-modal',
  templateUrl: './form-details-modal.component.html',
  styleUrls: ['./form-details-modal.component.scss']
})
export class FormDetailsModalComponent implements OnInit {
  public questionsArr: any[] = [];
  public answersArr: any[] = [];
  public displayedColumns: any[] = [];


  public cols = [
    'id',
    'question',
    'answer',
  ]

  constructor(
    public dialogRef: MatDialogRef<FormDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formService: FormsCrudService
  ) { }

  ngOnInit(): void {
    this.formService.getById(this.data.id).subscribe({
      next: (res: any) => {
        this.questionsArr = res.questions;
        this.answersArr = res.answers;
        console.log(res.answers);
        this.displayedColumns = this.questionsArr.map((q: any) => {
          return {
            id: q.id,
            question: q.label,
            answer: res.answers.find((a: any) => a.questionId === q.id).value ?? '-'
          }
        });
      }
    })

  }

}
