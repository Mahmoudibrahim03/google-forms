import { Component, OnInit } from '@angular/core';
import { FormsCrudService } from '../../core/services/forms-crud.service';
import { Router } from '@angular/router';
import { FormModalComponent } from '../_modals/form-modal/form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/_modals/confirmation-modal/confirmation-modal.component';
import { FormDetailsModalComponent } from '../_modals/form-details-modal/form-details-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public data: any[] = [];
  public displayedColumns: string[] = ['N', 'ID', 'TITLE', 'DESCRIPTION', 'Actions'];

  constructor(
    private formsService: FormsCrudService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllFomrs();
  }

  public create(): void {
    this.dialog.open(FormModalComponent)
      .afterClosed().subscribe((res) => {
        if (res) {
          this.formsService.create(res).subscribe({
            next: (res) => {
              this.getAllFomrs();
            }
          });
        }
      });
  }

  public delete(id: string): void {
    this.dialog.open(ConfirmationModalComponent).afterClosed().subscribe((res) => {
      if (res) {
        this.formsService.delete(id).subscribe((res) => {
          this.getAllFomrs();
        });
      }
    });
  }

  public getAllFomrs(): void {
    this.formsService.getAll().subscribe((res) => this.data = res);
  }

  public navigateToForm(formId: string): void {
    this.router.navigate([formId], { relativeTo: this.router.routerState.root });
  }

  public show(formId: string) {
    this.dialog.open(FormDetailsModalComponent, {
      minWidth: '50%',
      data: { id: formId }
    });
  }
}
