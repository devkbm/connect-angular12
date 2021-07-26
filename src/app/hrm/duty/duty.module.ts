
import { DutyApplicationGridComponent } from './component/duty-application/duty-application-grid.component';
import { DutyApplicationService } from './service/duty-application.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { AllNgZorroModule } from 'src/app/all-ng-zorro.module';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/common/grid/renderer/checkbox-renderer.component';

import { DutyCodeFormComponent } from './component/duty-code/duty-code-form.component';
import { DutyCodeService } from './service/duty-code.service';
import { DutyCodeComponent } from './component/duty-code/duty-code.component';
import { DutyCodeGridComponent } from './component/duty-code/duty-code-grid.component';
import { DutyApplicationFormComponent } from './component/duty-application/duty-application-form.component';
import { DutyApplicationComponent } from './component/duty-application/duty-application.component';
import { HrmCoreModule } from '../hrm-core/hrm-core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    AllNgZorroModule,
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent]),
    HrmCoreModule
  ],
  declarations: [
    DutyCodeFormComponent,
    DutyCodeGridComponent,
    DutyCodeComponent,
    DutyApplicationFormComponent,
    DutyApplicationGridComponent,
    DutyApplicationComponent
  ],
  providers: [
    DutyCodeService,
    DutyApplicationService
  ],
  exports: [
    DutyCodeComponent,
    DutyApplicationComponent
  ]
})
export class DutyModule { }
