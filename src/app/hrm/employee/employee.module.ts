import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { AllNgZorroModule } from 'src/app/all-ng-zorro.module';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/common/grid/renderer/checkbox-renderer.component';

import { EmployeeMasterComponent } from './component/basic-info/employee-master.component';
import { EmployeeFormComponent } from './component/basic-info/employee-form.component';
import { DeptChangeHistoryGridComponent } from './component/basic-info/dept-change-history-grid.component';
import { JobChangeHistoryGridComponent } from './component/basic-info/job-change-history-grid.component';
import { StatusChangeHistoryGridComponent } from './component/basic-info/status-change-history-grid.component';
import { EmployeeGridComponent } from './component/basic-info/employee-grid.component';
import { DeptEmployeeListComponent } from './component/dept-employee-list/dept-employee-list.component';
import { EmployeeCardComponent } from './component/employee-card/employee-card.component';

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
    EmployeeFormComponent,
    DeptChangeHistoryGridComponent,
    JobChangeHistoryGridComponent,
    StatusChangeHistoryGridComponent,
    EmployeeGridComponent,
    EmployeeMasterComponent,
    DeptEmployeeListComponent,
    EmployeeCardComponent
  ],
  providers: [
  ],
  exports: [
    EmployeeFormComponent,
    EmployeeMasterComponent,
    DeptEmployeeListComponent
  ]
})
export class EmployeeModule { }
