import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFuncModule } from '../../common/common-func.module';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { AllNgZorroModule } from '../../all-ng-zorro.module';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../common/grid/renderer/button-renderer.component';

import { SurveyService } from './service/survey.service';

import { SurveyFormComponent } from './component/survey-form.component';
import { SurveyItemFormComponent } from './component/survey-item-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    AllNgZorroModule,
    AgGridModule.withComponents([ButtonRendererComponent])
  ],
  declarations: [
    SurveyFormComponent,
    SurveyItemFormComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    DatePipe,
    SurveyService
  ],
  exports: [
    SurveyFormComponent
  ]
})
export class SurveyModule { }
