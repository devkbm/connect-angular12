import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { CommonCodeService } from '../../service/common-code.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseObject } from '../../model/response-object';
import { CommonCode } from '../../model/common-code';
import { CommonCodeHierarchy } from '../../model/common-code-hierarchy';
import { ResponseList } from '../../model/response-list';
import { FormBase, FormType } from '../../form/form-base';


@Component({
  selector: 'app-common-code-form',
  templateUrl: './common-code-form.component.html',
  styleUrls: ['./common-code-form.component.css']
})
export class CommonCodeFormComponent extends FormBase implements OnInit {

  fg: FormGroup = new FormGroup({});
  nodeItems: CommonCodeHierarchy[] = [];
  systemTypeCodeList: CommonCode[] = [];

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private commonCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.fg = this.fb.group({
      id                      : [ null ],
      systemTypeCode          : [ null ],
      parentId                : [ null ],
      code                    : [ null, [ Validators.required ] ],
      codeName                : [ null, [ Validators.required ] ],
      codeNameAbbreviation    : [ null ],
      fromDate                : [ null, [ Validators.required ] ],
      toDate                  : [ null, [ Validators.required ] ],
      seq                     : [ 1    ],
      hierarchyLevel          : [ 1    ],
      fixedLengthYn           : [ null ],
      codeLength              : [ null ],
      cmt                     : [ null ]
    });

    this.newForm(null);

    this.getCommonCodeHierarchy();
    this.getSystemTypeCode();
  }

  newForm(parentId: any): void {
    this.formType = FormType.NEW;
    const code = this.fg.get('code') as AbstractControl;
    const systemTypeCode = this.fg.get('systemTypeCode') as AbstractControl;
    const parent = this.fg.get('parentId') as AbstractControl;
    const fromDate = this.fg.get('fromDate') as AbstractControl;
    const toDate = this.fg.get('toDate') as AbstractControl;

    this.fg.reset();
    code.enable();
    systemTypeCode.enable();
    parent.setValue(parentId);
    fromDate.setValue(new Date());
    toDate.setValue(new Date(9999, 11, 31));
  }

  modifyForm(formData: CommonCode): void {
    this.formType = FormType.MODIFY;
    const code = this.fg.get('code') as AbstractControl;
    const systemTypeCode = this.fg.get('systemTypeCode') as AbstractControl;

    code.disable();
    systemTypeCode.disable();

    this.fg.patchValue(formData);
  }

  getCommonCode(id: string): void {
    this.commonCodeService
        .getCommonCode(id)
        .subscribe(
            (model: ResponseObject<CommonCode>) => {
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
            () => {}
        );
  }

  getCommonCodeHierarchy(): void {
    this.commonCodeService
        .getCommonCodeHierarchy()
        .subscribe(
          (model: ResponseList<CommonCodeHierarchy>) => {
            if ( model.total > 0 ) {
              this.nodeItems = model.data;
            } else {
              this.nodeItems = new Array<CommonCodeHierarchy>(0);
            }
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log('완료');
          }
        );
  }

  submitCommonCode(): void {
    if (this.validForm(this.fg) === false)
      return;

    this.commonCodeService
        .registerCommonCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  deleteCommonCode(): void {
    this.commonCodeService
        .deleteCommonCode(this.fg.get('id')?.value)
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  getSystemTypeCode(): void {
    this.commonCodeService
      .getCommonCodeListByParentId('COMSYSTEM')
      .subscribe(
        (model: ResponseList<CommonCode>) => {
          this.systemTypeCodeList = model.data;
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

}
