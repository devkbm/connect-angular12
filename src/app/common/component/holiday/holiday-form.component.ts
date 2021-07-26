import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormBase, FormType } from '../../form/form-base';
import { AppAlarmService } from '../../service/app-alarm.service';
import { HolidayService } from '../../service/holiday.service';
import { ResponseObject } from '../../model/response-object';
import { Holiday } from './../../model/holiday';


@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.css']
})
export class HolidayFormComponent extends FormBase implements OnInit {

  fg: FormGroup = new FormGroup({});

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private holidayService: HolidayService,
              private appAlarmService: AppAlarmService,
              private datePipe: DatePipe) { super(); }

  ngOnInit(): void {
    this.fg = this.fb.group({
      date          : [ null ],
      holidayName   : [ null ],
      comment       : [ null ]
    });

    this.newForm(new Date());

    this.defaultControlSize.xs = 23;
    this.defaultLabelSize.xs = 1;
  }

  public newForm(date: Date): void {
    this.formType = FormType.NEW;
    this.fg.reset();
    this.fg.get('date')?.setValue(date);
  }

  public modifyForm(formData: Holiday): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  public getEntity(id: string): void {
    this.holidayService
        .getHoliday(id)
        .subscribe(
            (model: ResponseObject<Holiday>) => {
              if ( model.total > 0 ) {
                this.modifyForm(model.data);
              } else {
                this.newForm(new Date());
              }
              this.appAlarmService.changeMessage(model.message);
            },
            (err) => {
              console.log(err);
            },
            () => {}
        );
  }

  public submitEntity(): void {
    if (this.validForm(this.fg) === false)
      return;

    this.holidayService
        .saveHoliday(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Holiday>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteEntity(): void {
    const id = this.datePipe.transform(this.fg.get('date')?.value, 'yyyyMMdd') as string;

    this.holidayService
        .deleteHoliday(id)
        .subscribe(
            (model: ResponseObject<Holiday>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
