import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemInputComponent } from './form-item-input.component';

describe('FormItemInputComponent', () => {
  let component: FormItemInputComponent;
  let fixture: ComponentFixture<FormItemInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormItemInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
