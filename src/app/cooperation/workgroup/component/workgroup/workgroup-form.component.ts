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
import { ResponseList } from '../../../../common/model/response-list';

@Component({
selector: 'app-workgroup-form',
templateUrl: './workgroup-form.component.html',
styleUrls: ['./workgroup-form.component.css']
})
export class WorkGroupFormComponent extends FormBase implements OnInit {

    fg: FormGroup = new FormGroup({});

    /**
     * Xs < 576px span size
     * Sm >= 576px span size
     */
    formLabelXs = 24;
    formControlXs = 24;

    formLabelSm = 24;
    formControlSm = 24;

    workGroupList: any;
    memberList: any;
    color: any;

    constructor(private fb: FormBuilder,
                private workGroupService: WorkGroupService) { super(); }

    ngOnInit(): void {
        this.getAllMember();

        this.newForm();
    }

    //#region public methods

    public newForm(): void {
        this.formType = FormType.NEW;

        this.fg = this.fb.group({
            workGroupId     : new FormControl({value: null, disabled: true}),
            workGroupName   : [ null, [ Validators.required ] ],
            color           : [ null, [ Validators.required ] ],
            memberList      : [ null ]
        });
    }

    public modifyForm(formData: WorkGroup): void {
        this.formType = FormType.MODIFY;

        this.fg = this.fb.group({
            workGroupId     : new FormControl({value: null, disabled: true}),
            workGroupName   : [ null, [ Validators.required ] ],
            color           : [ null, [ Validators.required ] ],
            memberList      : [ null ]
        });
        this.color = formData.color;
        this.fg.patchValue(formData);
    }

    public getWorkGroup(id: number): void {
        this.workGroupService.getWorkGroup(id)
        .subscribe(
            (model: ResponseObject<WorkGroup>) => {
            if (model.data) {
                this.modifyForm(model.data);
            } else {
                this.newForm();
            }
            },
            (err) => {},
            () => {}
        );
    }

    public saveWorkGroup(): void {
        this.workGroupService
        .saveWorkGroup(this.fg.getRawValue())
        .subscribe(
            (model: ResponseObject<WorkGroup>) => {
            this.formSaved.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {
            console.log('완료');
            }
        );
    }

    public deleteWorkGroup(id: number): void {
        this.workGroupService.deleteWorkGroup(id)
        .subscribe(
            (model: ResponseObject<WorkGroup>) => {
                this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {},
            () => {}
        );
    }

    public closeForm(): void {
        this.formClosed.emit(this.fg.getRawValue());
    }

    public getAllMember(): void {
        this.workGroupService.getMemberList()
        .subscribe(
            (model: ResponseList<WorkGroupMember>) => {
            if (model.data) {
                this.memberList = model.data;
            } else {
                this.memberList = [];
            }
            },
            (err) => {},
            () => {}
        );
    }

    public selectColor(color: any): void {
        console.log(color);

        this.fg.get('color')?.setValue(color);
    }

    //#endregion

}
