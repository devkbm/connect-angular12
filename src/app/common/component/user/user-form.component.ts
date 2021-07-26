import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

import { UserService } from '../../service/user.service';

import { AppAlarmService } from '../../service/app-alarm.service';
import { ResponseObject } from '../../model/response-object';
import { User } from '../../model/user-info';

import { AppError } from '../../error/app-error';
import { UserNotFoundError } from '../../error/user-not-found-error';
import { ResponseList } from '../../model/response-list';
import { Authority } from '../../model/authority';
import { MenuGroup } from '../../model/menu-group';
import { existingUserValidator } from '../../validator/user-duplication-validator.directive';
import { FormType, FormBase } from '../../form/form-base';
import { DeptHierarchy } from '../../model/dept-hierarchy';
import { DeptService } from '../../service/dept.service';
import { HttpHeaders } from '@angular/common/http';
import { GlobalProperty } from 'src/app/global-property';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends FormBase implements OnInit {

  /* #region Property  */
  public fg: FormGroup = new FormGroup({});
  public authList: any;
  public menuGroupList: any;
  public deptHierarchy: DeptHierarchy[] = [];

  passwordConfirm: string = '';
  popup: boolean = false;


  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: false
  };

  fileList: NzUploadFile[] = [
    /*{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }*/
  ];

  previewImage: string | undefined = '';
  previewVisible = false;
  imageUploadUrl: string = GlobalProperty.serverUrl + '/user/image/';
  imageUploadHeader: any = {
    Authorization: sessionStorage.getItem('token')
    //'x-auth-token': sessionStorage.getItem('token')
    //'Content-Type': 'multipart/form-data'
  };
  imageUploadParam: any;

  imageBase64: any;
  isUploadable: any;

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  formControlSm = 24;


  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();
  /* #endregion */

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private deptService: DeptService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.fg = this.fb.group({
      userId: new FormControl(null, {
        validators: Validators.required,
        asyncValidators: [existingUserValidator(this.userService)],
        updateOn: 'blur'
      }),
      name: new FormControl({ value: null, disabled: false }, { validators: Validators.required }),
      enabled: [true],
      deptCode: [null],
      mobileNum: [null],
      email: new FormControl({ value: null, disabled: false }, { validators: Validators.email }),
      imageBase64: [null],
      authorityList: [null],
      menuGroupList: [null]
    });

    this.newForm();

    this.getAuthorityList();
    this.getMenuGroupList();
    this.getDeptHierarchy();
  }

  /* #region  Method */
  public newForm(): void {
    this.formType = FormType.NEW;
    this.imageBase64 = null;
    this.previewImage = '';
    this.fileList = [];

    this.fg.reset();
    this.fg.get('userId')?.enable();
  }

  public modifyForm(formData: User): void {
    this.formType = FormType.MODIFY;
    this.fileList = [];

    this.fg.get('userId')?.disable();

    this.fg.patchValue(formData);
  }

  public getUser(userId: string): void {
    this.userService
      .getUser(userId)
      .subscribe(
        (model: ResponseObject<User>) => {
          if (model.total > 0) {
            if (model.data.userId == null) {
              this.newForm();
            } else {
              this.modifyForm(model.data);
            }

            this.previewImage = '';

            const token = sessionStorage.getItem('token') as string;





            this.imageUploadHeader =  {
              "Content-Type": "multipart/form-data",
              "Accept": "application/json",
              "Authorization": sessionStorage.getItem('token')
            };
            console.log(this.imageUploadHeader);
            this.imageUploadParam = { userId: model.data.userId };
            if (model.data.imageBase64 != null) {
              //this.imageBase64 = 'data:image/jpg;base64,' + model.data.imageBase64;
              this.imageBase64 = model.data.imageBase64;
              this.isUploadable = false;
            } else {
              this.imageBase64 = '';
              this.isUploadable = true;
            }

          } else {
            this.fg.reset();
          }

          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
          this.fg.reset();
        },
        () => {
          console.log('완료');
        }
      );
  }

  public registerUser(): void {

    if (this.validForm(this.fg) === false)
      return;

    this.userService
      .registerUser(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<User>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formSaved.emit(this.fg.value);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  public deleteUser(userId: string): void {
    this.userService
      .deleteUser(userId)
      .subscribe(
        (model: ResponseObject<User>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.fg.getRawValue());
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.popup = false;
        }
      );
  }

  protected checkUser(): void {
    const userId: string = this.fg.get('userId')?.value;

    this.fg.get('userId')?.markAsDirty();
    this.fg.get('userId')?.updateValueAndValidity();

    this.userService
      .checkUser(this.fg.get('userId')?.value)
      .subscribe(
        (model: ResponseObject<boolean>) => {
          this.appAlarmService.changeMessage(model.message);
        },
        (err: AppError) => {
          if (err instanceof UserNotFoundError) {
            console.log('유저정보가 없음');
          }
        },
        () => {
          console.log('완료');
        }
      );
  }

  private validPassword(field: any) {

    /*if ( this.user.password === this.passwordConfirm) {
      // 폼 검증 수행해야 함
    } else {
      // 폼 검증 실패
    }*/

  }

  private getAuthorityList(): void {
    this.userService
      .getAuthorityList()
      .subscribe(
        (model: ResponseList<Authority>) => {
          if (model.total > 0) {
            this.authList = model.data;
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

  private getMenuGroupList(): void {
    this.userService
      .getMenuGroupList()
      .subscribe(
        (model: ResponseList<MenuGroup>) => {
          if (model.total > 0) {
            this.menuGroupList = model.data;
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

  public getDeptHierarchy(): void {
    this.deptService
      .getDeptHierarchyList()
      .subscribe(
        (model: ResponseList<DeptHierarchy>) => {
          if (model.total > 0) {
            this.deptHierarchy = model.data;
          } else {
            this.deptHierarchy = [];
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

  public closeForm(): void {
    this.formClosed.emit(this.fg.value);
  }

  // 미리보기 버튼 클릭시
  handlePreview = (file: NzUploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  // 삭제버튼 클릭스
  handleRemove = (file: NzUploadFile) => {
    console.log(file);
    return true;
  }

  fileUploadChange(param: NzUploadChangeParam): void {
    if (param.type === 'success') {
      this.isUploadable = false;
    }
  }
  /* #endregion */

}
