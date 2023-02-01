import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  public formCreator: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formCreator = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  public save() {
    this.dialogRef.close(this.formCreator.value);
  }

  public close() {
    this.dialogRef.close();
  }

}
