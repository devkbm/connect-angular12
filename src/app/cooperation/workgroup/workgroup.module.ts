import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFuncModule } from '../../common/common-func.module';
/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { AllNgZorroModule } from '../../all-ng-zorro.module';
import { NzModalService } from 'ng-zorro-antd/modal';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { ColorPickerModule } from 'ngx-color-picker';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../common/grid/renderer/button-renderer.component';

import { WorkGroupService } from './service/workgroup.service';
import { WorkgroupComponent } from './component/workgroup/workgroup.component';
import { WorkGroupFormComponent } from './component/workgroup/workgroup-form.component';
import { WorkScheduleFormComponent } from './component/workgroup/work-schedule-form.component';
import { WorkCalendarComponent } from './component/workgroup/work-calendar.component';
import { MyWorkGroupGridComponent } from './component/workgroup/myworkgroup-grid.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  interactionPlugin,
  dayGridPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    AllNgZorroModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    CKEditorModule,
    FullCalendarModule,
    ColorPickerModule
  ],
  declarations: [
    WorkGroupFormComponent,
    WorkScheduleFormComponent,
    WorkCalendarComponent,
    MyWorkGroupGridComponent,
    WorkgroupComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    DatePipe,
    WorkGroupService
  ],
  exports: [
    WorkgroupComponent
  ]
})
export class WorkgroupModule { }
