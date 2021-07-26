import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from '../../service/menu.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseObject } from '../../model/response-object';
import { MenuGroup } from '../../model/menu-group';
import { existingMenuGroupValidator } from '../../validator/menu-group-duplication-validator.directive';
import { FormBase, FormType } from '../../form/form-base';

@Component({
  selector: 'app-menu-group-form',
  templateUrl: './menu-group-form.component.html',
  styleUrls: ['./menu-group-form.component.css']
})
export class MenuGroupFormComponent extends FormBase implements OnInit {

  fg: FormGroup = new FormGroup({});

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  fromControlSm = 24;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      menuGroupCode   : new FormControl(null, {
                                                validators: Validators.required,
                                                asyncValidators: [existingMenuGroupValidator(this.menuService)],
                                                updateOn: 'blur'
                                              }),
      menuGroupName   : [ null, [ Validators.required ] ],
      description     : [ null]
    });

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.controls['menuGroupCode'].enable();
  }

  public modifyForm(formData: MenuGroup): void {
    this.formType = FormType.MODIFY;
    this.fg.controls['menuGroupCode'].disable();

    this.fg.patchValue(formData);
  }

  public getMenuGroup(menuGroupCode: string) {
    this.menuService
      .getMenuGroup(menuGroupCode)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          if ( model.total > 0 ) {
            this.modifyForm(model.data);
          } else {
            this.newForm();
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  submitMenuGroup() {
    if (this.validForm(this.fg) === false)
      return;

    this.menuService
      .registerMenuGroup(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          this.formSaved.emit(this.fg.getRawValue());
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => { }
      );
  }

  deleteMenuGroup() {
    this.menuService
      .deleteMenuGroup(this.fg.get('menuGroupCode')?.value)
      .subscribe(
        (model: ResponseObject<MenuGroup>) => {
          this.formDeleted.emit(this.fg.getRawValue());
          this.appAlarmService.changeMessage(model.total + '건의 메뉴그룹이 삭제되었습니다.');
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

}
