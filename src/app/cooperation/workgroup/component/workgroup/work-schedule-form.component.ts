import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ResponseObject } from '../../../../common/model/response-object';
import { FormBase, FormType } from '../../../../common/form/form-base';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroup } from '../../model/workgroup';
import { WorkGroupMember } from '../../model/workgroup-member';
import { WorkGroupSchedule } from '../../model/workgroup-schedule';
import { ResponseList } from '../../../../common/model/response-list';

@Component({
selector: 'app-work-schedule-form',
templateUrl: './work-schedule-form.component.html',
styleUrls: ['./work-schedule-form.component.css']
})
export class WorkScheduleFormComponent extends FormBase implements OnInit {

    /**
     * Xs < 576px span size
     * Sm >= 576px span size
     */
    formLabelXs = 24;
    formControlXs = 24;

    formLabelSm = 24;
    formControlSm = 24;

    form: FormGroup = new FormGroup({});
    workGroupList: any;
    startTime: any;

    constructor(private fb: FormBuilder,
                private workGroupService: WorkGroupService) {
                    super();
                }

    ngOnInit(): void {
        this.getMyWorkGroupList();
        this.newForm('');
    }

    //#region public methods

    public newForm(workGroupId: string): void {
        this.formType = FormType.NEW;

        this.form = this.fb.group({
            id              : new FormControl({value: null, disabled: true}),
            title           : [ null, [ Validators.required ] ],
            start           : [ new Date(), [ Validators.required ] ],
            end             : [ new Date(), [ Validators.required ] ],
            allDay          : [ null, [ Validators.required ] ],
            workGroupId     : [ Number.parseInt(workGroupId,10), [ Validators.required ] ]
        });
    }

    public modifyForm(formData: WorkGroupSchedule): void {
        this.formType = FormType.MODIFY;

        this.form = this.fb.group({
            id              : new FormControl({value: formData.id, disabled: true}),
            title           : [ null, [ Validators.required ] ],
            start           : [ null, [ Validators.required ] ],
            end             : [ null, [ Validators.required ] ],
            allDay          : [ null, [ Validators.required ] ],
            workGroupId     : [ formData.workGroupId, [ Validators.required ] ]
        });

        this.form.patchValue(formData);
    }

    public getWorkGroupSchedule(id: number): void {
        this.workGroupService.getWorkGroupSchedule(id)
        .subscribe(
            (model: ResponseObject<WorkGroupSchedule>) => {
            if (model.data) {
                this.modifyForm(model.data);
            } else {
                this.newForm('');
            }
            },
            (err) => {},
            () => {}
        );
    }

    public saveWorkGroupSchedule(): void {
        this.workGroupService
        .saveWorkGroupSchedule(this.form.getRawValue())
        .subscribe(
            (model: ResponseObject<WorkGroupSchedule>) => {
                this.formSaved.emit(this.form.getRawValue());
            },
            (err) => {
                console.log(err);
            },
            () => {
                console.log('완료');
            }
        );
    }

    public deleteWorkGroupSchedule(id: number): void {
        this.workGroupService.deleteWorkGroupSchedule(id)
        .subscribe(
            (model: ResponseObject<WorkGroupSchedule>) => {
                this.formDeleted.emit(this.form.getRawValue());
            },
            (err) => {},
            () => {}
        );
    }

    public getMyWorkGroupList(): void {
        this.workGroupService
            .getMyWorkGroupList()
            .subscribe(
              (model: ResponseList<WorkGroup>) => {
                  if (model.total > 0) {
                      this.workGroupList = model.data;
                  } else {
                      this.workGroupList = [];
                  }
                  //this.appAlarmService.changeMessage(model.message);
              },
              (err) => {
                  console.log(err);
              },
              () => {}
            );
      }

    public closeForm(): void {
        this.formClosed.emit(this.form.getRawValue());
    }

    //#endregion

}
