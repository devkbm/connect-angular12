import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { TermService } from '../../service/term.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseObject } from '../../model/response-object';
import { Term } from '../../model/term';

@Component({
  selector: 'app-term-form',
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.css']
})
export class TermFormComponent implements OnInit {

  fg: FormGroup = new FormGroup({});

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private termService: TermService,
              private appAlarmService: AppAlarmService) { }

  ngOnInit(): void {

    this.fg = this.fb.group({
      pkTerm            : [ null ],
      domain            : [ null, [ Validators.required ] ],
      term              : [ null, [ Validators.required ] ],
      nameKor           : [ null, [ Validators.required ] ],
      abbreviationKor   : [ null, [ Validators.required ] ],
      nameEng           : [ null, [ Validators.required ] ],
      abbreviationEng   : [ null, [ Validators.required ] ],
      description       : [ null ],
      comment           : [ null ]
    });
  }

  public getTerm(): void {
    this.termService
      .getTerm(this.fg.get('pkTerm')?.value)
      .subscribe(
        (model: ResponseObject<Term>) => {
          if ( model.total > 0 ) {
            this.fg.patchValue(model.data);
          } else {
            this.fg.reset();
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  public submitTerm(): void {

    this.termService
        .registerTerm(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Term>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteTerm(): void {
    this.termService
      .deleteTerm(this.fg.get('pkTerm')?.value)
      .subscribe(
        (model: ResponseObject<Term>) => {
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
