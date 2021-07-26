import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { AppLayoutRoutingModule } from './app-layout-routing.module';

import { MenuService } from '../common/service/menu.service';
import { ProgramService } from '../common/service/program.service';
import { AppAlarmService } from '../common/service/app-alarm.service';
import { TermService } from '../common/service/term.service';

import { AppLayoutComponent } from './app-layout.component';
import { UserPopupComponent } from '../common/component/user/user-popup.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppLayoutRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzIconModule,
    NzSelectModule
  ],
  declarations: [
    AppLayoutComponent
  ],
  entryComponents: [
    UserPopupComponent
  ],
  providers: [
    AppAlarmService,
    MenuService,
    ProgramService,
    TermService
  ],
  exports: [
    AppLayoutComponent
  ]
})
export class AppLayoutModule { }
