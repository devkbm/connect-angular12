import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFuncModule } from '../../common/common-func.module';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { AllNgZorroModule } from '../../all-ng-zorro.module';
import { NzModalService } from 'ng-zorro-antd/modal';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../common/grid/renderer/button-renderer.component';
import { TeamService } from './service/team.service';
import { TeamFormComponent } from './component/team-form.component';
import { TeamGridComponent } from './component/team-grid.component';
import { TeamComponent } from './component/team.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    AllNgZorroModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    CKEditorModule
  ],
  declarations: [
    TeamFormComponent,
    TeamGridComponent,
    TeamComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    TeamService
  ],
  exports: [
    TeamComponent,
    TeamFormComponent
  ]
})
export class CommunicationModule { }
