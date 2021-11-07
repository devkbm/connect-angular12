import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { AllNgZorroModule } from 'src/app/all-ng-zorro.module';
import { NzModalService } from 'ng-zorro-antd/modal';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from '../app-routing.module';

import { LoginService } from './component/login/login.service';
import { UserService } from './component/user/user.service';

import { LoginComponent } from './component/login/login.component';
import { MenuFormComponent } from './component/menu/menu-form.component';
import { MenuGroupFormComponent } from './component/menu/menu-group-form.component';
import { AuthorityFormComponent } from './component/authority/authority-form.component';
import { AuthorityGridComponent } from './component/authority/authority-grid.component';
import { AuthorityComponent } from './component/authority/authority.component';
import { UserGridComponent } from './component/user/user-grid.component';
import { UserFormComponent } from './component/user/user-form.component';
import { UserComponent } from './component/user/user.component';
import { ProgramFormComponent } from './component/program/program-form.component';
import { ProgramGridComponent } from './component/program/program-grid.component';
import { ProgramComponent } from './component/program/program.component';
import { MenuGroupGridComponent } from './component/menu/menu-group-grid.component';
import { MenuGridComponent } from './component/menu/menu-grid.component';
import { MenuComponent } from './component/menu/menu.component';
import { TermComponent } from './component/terms/term.component';
import { TermGridComponent } from './component/terms/term-grid.component';
import { TermFormComponent } from './component/terms/term-form.component';
import { TermService } from './component/terms/term.service';
import { CommonCodeFormComponent } from './component/commoncode/common-code-form.component';
import { CommonCodeService } from './component/commoncode/common-code.service';
import { CommonCodeGridComponent } from './component/commoncode/common-code-grid.component';
import { CommonCodeComponent } from './component/commoncode/common-code.component';
import { CommonCodeTreeComponent } from './component/commoncode/common-code-tree.component';
import { UserPopupComponent } from './component/user/user-popup.component';
import { HolidayGridComponent } from './component/holiday/holiday-grid.component';
import { HolidayComponent } from './component/holiday/holiday.component';
import { HolidayFormComponent } from './component/holiday/holiday-form.component';
import { HolidayService } from './component/holiday/holiday.service';

import { UserDuplicationValidatorDirective } from './component/user/user-duplication-validator.directive';
import { ButtonRendererComponent } from './grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from './grid/renderer/checkbox-renderer.component';
import { DeptFormComponent } from './component/dept/dept-form.component';
import { DeptTreeComponent } from './component/dept/dept-tree.component';
import { DeptComponent } from './component/dept/dept.component';
import { MenuService } from './component/menu/menu.service';
import { DeptService } from './component/dept/dept.service';
import { CustomHttpInterceptor } from './interceptor/custom-http-interceptor';
import { UserSessionService } from './service/user-session.service';
import { CheckableDeptTreeComponent } from './component/dept/checkable-dept-tree.component';
import { DeptSelectComponent } from './component/dept/dept-select.component';
import { FormCrudButtonGroupComponent } from './component/form-crud-button-group/form-crud-button-group.component';
import { UserImageUploadComponent } from './component/user/user-image-upload.component';
import { FormItemInputComponent } from './component/form-item-input/form-item-input.component';
import { FormItemSelectComponent } from './component/form-item-select/form-item-select.component';
import { BizTypeFormComponent } from './component/bizcode/biz-type-form.component';
import { BizCodeComponent } from './component/bizcode/biz-code.component';
import { AuthorityService } from './component/authority/authority.service';
import { BizDetailFormComponent } from './component/bizcode/biz-detail-form.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    AppRoutingModule,
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent]),
    AllNgZorroModule
  ],
  declarations: [
    UserDuplicationValidatorDirective,
    LoginComponent,
    ButtonRendererComponent,
    CheckboxRendererComponent,
    UserFormComponent,
    UserGridComponent,
    UserComponent,
    UserPopupComponent,
    MenuFormComponent,
    MenuGridComponent,
    MenuGroupFormComponent,
    MenuGroupGridComponent,
    MenuComponent,
    ProgramFormComponent,
    ProgramGridComponent,
    ProgramComponent,
    AuthorityFormComponent,
    AuthorityGridComponent,
    AuthorityComponent,
    TermGridComponent,
    TermFormComponent,
    TermComponent,
    CommonCodeFormComponent,
    CommonCodeGridComponent,
    CommonCodeTreeComponent,
    CommonCodeComponent,
    DeptFormComponent,
    DeptTreeComponent,
    CheckableDeptTreeComponent,
    DeptSelectComponent,
    DeptComponent,
    HolidayFormComponent,
    HolidayGridComponent,
    HolidayComponent,
    FormCrudButtonGroupComponent,
    UserImageUploadComponent,
    FormItemInputComponent,
    FormItemSelectComponent,
    BizTypeFormComponent,
    BizCodeComponent,
    BizDetailFormComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    LoginService,
    UserService,
    AuthorityService,
    UserSessionService,
    CommonCodeService,
    MenuService,
    DeptService,
    HolidayService,
    TermService,
    NzModalService
  ],
  exports: [
    LoginComponent,
    UserFormComponent,
    UserGridComponent,
    UserComponent,
    UserPopupComponent,
    MenuFormComponent,
    MenuGroupFormComponent,
    ProgramFormComponent,
    ProgramGridComponent,
    ProgramComponent,
    AuthorityFormComponent,
    AuthorityGridComponent,
    AuthorityComponent,
    TermComponent,
    CommonCodeFormComponent,
    CommonCodeGridComponent,
    CommonCodeTreeComponent,
    CommonCodeComponent,
    DeptTreeComponent,
    CheckableDeptTreeComponent,
    DeptSelectComponent,
    HolidayComponent,
    FormCrudButtonGroupComponent,
    FormItemSelectComponent,
    FormItemInputComponent,
    BizCodeComponent
  ]
})
export class CommonFuncModule { }
