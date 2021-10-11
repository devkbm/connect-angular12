import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/common/form/form-base';
import { ResponseObject } from 'src/app/common/model/response-object';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { StaffAppointmentRecord } from './staff-appointment-record.model';
import { StaffAppointmentRecordService } from './staff-appointment-record.service';

@Component({
  selector: 'app-staff-appointment-record-form',
  templateUrl: './staff-appointment-record-form.component.html',
  styleUrls: ['./staff-appointment-record-form.component.css']
})
export class StaffAppointmentRecordFormComponent extends FormBase implements OnInit {

  fg: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              private staffAppointmentRecordService: StaffAppointmentRecordService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {

    this.fg = this.fb.group({
      staffId             : [ null, [ Validators.required ] ],
      id                  : [ null ],
      appointmentDate     : [ null ],
      appointmentEndDate  : [ null ],
      recordName          : [ null ],
      processWatingYn     : [ null ],
      blngDeptCode        : [ null ],
      workDeptCode        : [ null ],
      jobGroupCode        : [ null ],
      jobPositionCode     : [ null ],
      occupationCode      : [ null ],
      jobGradeCode        : [ null ],
      payStepCode         : [ null ],
      jobCode                 : [ null ],
      dutyResponsibilityCode  : [ null ]
    });

    this.newForm();
  }

  newForm(): void {
    this.formType = FormType.NEW;
  }

  modifyForm(formData: StaffAppointmentRecord): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);

  }

  getForm(staffId: string, id: string): void {

    this.staffAppointmentRecordService
        .getStaffAppointmentRecord(staffId, id)
        .subscribe(
          (model: ResponseObject<StaffAppointmentRecord>) => {
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
          () => {}
      );
  }

  submitForm(): void {
    this.staffAppointmentRecordService
        .saveStaffAppointmentRecord(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<StaffAppointmentRecord>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  deleteForm(id: any): void {
    /*this.appointmentCodeService
        .deleteAppointmentCodeDetail(this.fg.get('code').value)
        .subscribe(
            (model: ResponseObject<AppointmentCodeDetail>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );*/
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }
}
