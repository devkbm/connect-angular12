import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemSelectComponent } from './form-item-select.component';

describe('FormItemSelectComponent', () => {
  let component: FormItemSelectComponent;
  let fixture: ComponentFixture<FormItemSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormItemSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
