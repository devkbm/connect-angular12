import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { AllNgZorroModule } from 'src/app/all-ng-zorro.module';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/common/grid/renderer/checkbox-renderer.component';

import { StaffRegistFormComponent } from './staff-regist-form.component';
import { StaffAppointmentRecordFormComponent } from './staff-appointment-record-form.component';
import { StaffAppointmentRecordGridComponent } from './staff-appointment-record-grid.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    AllNgZorroModule,
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent])
  ],
  declarations: [
    StaffRegistFormComponent,
    StaffAppointmentRecordFormComponent,
    StaffAppointmentRecordGridComponent
  ],
  exports: [
    StaffRegistFormComponent,
    StaffAppointmentRecordFormComponent
  ]
})
export class StaffModule { }
