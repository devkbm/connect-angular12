import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from '../../service/menu.service';
import { ProgramService } from '../../service/program.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseList } from '../../model/response-list';
import { ResponseObject } from '../../model/response-object';
import { Menu } from '../../model/menu';
import { WebResource } from '../../model/web-resource';
import { MenuHierarchy } from '../../model/menu-hierarchy';
import { MenuGroup } from '../../model/menu-group';
import { FormBase, FormType } from '../../form/form-base';
import { existingMenuValidator } from '../../validator/menu-duplication-validator.directive';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent extends FormBase implements OnInit {

  fg: FormGroup = new FormGroup({});
  programList: any;
  menuGroupList: any;
  menuTypeList: any;

  /**
   * 상위 메뉴 트리
   */
  menuHiererachy: MenuHierarchy[];

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  formControlSm = 24;

  @Input()
  menuGroupCode: string = '';

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private programService: ProgramService,
              private appAlarmService: AppAlarmService) {
    super();
    this.menuHiererachy = [];

    this.getMenuTypeList();
    this.getProgramList();
    this.getMenuGroupList();
  }

  ngOnInit() {
    this.fg = this.fb.group({
      menuGroupCode     : [ null, [ Validators.required ] ],
      menuCode          : new FormControl(null, {
                                                  validators: Validators.required,
                                                  asyncValidators: [existingMenuValidator(this.menuService)],
                                                  updateOn: 'blur'
                                                }),
      menuName          : [ null, [ Validators.required ] ],
      menuType          : [ null, [ Validators.required ] ],
      parentMenuCode    : [ null ],
      sequence          : [ null ],
      resource          : [ null ]
    });

    this.newForm('');
  }

  public newForm(menuGroupCode: string): void {
    this.formType = FormType.NEW;

    this.getMenuHierarchy(menuGroupCode);

    this.fg.reset();
    this.fg.controls['menuGroupCode'].setValue(menuGroupCode);
    this.fg.controls['menuCode'].enable();
  }

  public modifyForm(formData: Menu): void {
    this.formType = FormType.MODIFY;

    this.getMenuHierarchy(formData.menuGroupCode);

    this.fg.controls['menuCode'].disable();

    this.fg.patchValue(formData);
  }

  public getMenu(menuCode: string) {

    this.menuService
      .getMenu(menuCode)
      .subscribe(
        (model: ResponseObject<Menu>) => {
          if ( model.total > 0 ) {
            this.modifyForm(model.data);
          } else {
            this.newForm('');
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  submitMenu() {
    if (this.validForm(this.fg) === false)
      return;

    this.menuService
      .registerMenu(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<Menu>) => {
          this.formSaved.emit(this.fg.getRawValue());
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  deleteMenu(): void {
    this.menuService
      .deleteMenu(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<Menu>) => {
          this.formDeleted.emit(this.fg.getRawValue());
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  getMenuHierarchy(menuGroupCode: string): void {

    this.menuService
      .getMenuHierarchy(menuGroupCode)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            this.menuHiererachy = model.data;
          } else {
            this.menuHiererachy = [];
          }
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  getProgramList(): void {
    this.programService
      .getProgramList()
      .subscribe(
        (model: ResponseList<WebResource>) => {
          if (model.total > 0) {
            this.programList = model.data;
          } else {
            this.programList = [];
          }
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  getMenuGroupList(): void {
    this.menuService
      .getMenuGroupList()
      .subscribe(
        (model: ResponseList<MenuGroup>) => {
          console.log(model.data);
          if (model.total > 0) {
            this.menuGroupList = model.data;
          } else {
            this.menuGroupList = [];
          }
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  getMenuTypeList(): void {
    this.menuService
      .getMenuTypeList()
      .subscribe(
        (model: ResponseList<any>) => {
          if (model.total > 0) {
            this.menuTypeList = model.data;
          } else {
            this.menuTypeList = [];
          }
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  selectMenuGroup(menuGroupCode: any): void {
    this.getMenuHierarchy(menuGroupCode);
  }

}
