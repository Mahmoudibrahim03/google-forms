import { MatDialogModule } from "@angular/material/dialog";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { FormModalComponent } from './_modals/form-modal/form-modal.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormDetailsModalComponent } from './_modals/form-details-modal/form-details-modal.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FormModalComponent,
    FormDetailsModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,

  ],
  exports: [
    DashboardComponent,
    FormModalComponent,
  ]
})
export class DashboardModule { }
