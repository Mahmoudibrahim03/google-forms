import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './_modals/confirmation-modal/confirmation-modal.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],

})
export class SharedModule { }
