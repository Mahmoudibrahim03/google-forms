import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetailsModalComponent } from './form-details-modal.component';

describe('FormDetailsModalComponent', () => {
  let component: FormDetailsModalComponent;
  let fixture: ComponentFixture<FormDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
