import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { BoardService } from '.././service/board.service';

import { ResponseObject } from '../../../common/model/response-object';
import { Board } from '.././model/board';
import { BoardHierarchy } from '../model/board-hierarchy';
import { ResponseList } from '../../../common/model/response-list';
import { FormBase, FormType } from 'src/app/common/form/form-base';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent extends FormBase implements OnInit {

  fg: FormGroup = new FormGroup({});

  parentBoardItems: BoardHierarchy[] = [];

  boardTypeList: any;

  constructor(private fb: FormBuilder,
              private boardService: BoardService) {
    super();

    this.getboardHierarchy();
    this.getBoardTypeList();
  }

  ngOnInit() {

    this.fg = this.fb.group({
      pkBoard         : [ null ],
      ppkBoard        : [ null ],
      boardName       : [ null, [ Validators.required ] ],
      boardType       : [ null, [ Validators.required ] ],
      boardDescription: [ null ],
      fromDate        : [ new Date() ],
      toDate          : [ new Date(9999, 11, 31) ]
    });

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('pkBoard')?.enable();

    this.fg.get('fromDate')?.setValue(new Date());
    this.fg.get('toDate')?.setValue(new Date(9999, 11, 31));
  }

  public modifyForm(formData: Board): void {
    this.formType = FormType.MODIFY;

    this.fg.get('pkBoard')?.disable();

    this.fg.patchValue(formData);
  }

  public getBoardTypeList(): void {
    this.boardService
        .getBoardTypeList()
        .subscribe(
          (model: ResponseObject<any>) => {
            if (model.data) {
              this.boardTypeList = model.data;
            } else {
              this.boardTypeList = [];
            }
          },
          (err) => {},
          () => {}
        );
  }

  public getBoard(id: string): void {
    this.boardService.getBoard(id)
      .subscribe(
        (model: ResponseObject<Board>) => {
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

  public saveBoard(): void {

    this.boardService
      .saveBoard(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<Board>) => {
          console.log(model);
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

  public deleteBoard(): void {
    this.boardService
      .deleteBoard(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<Board>) => {
          console.log(model);
          this.formDeleted.emit(this.fg.getRawValue());
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  public getboardHierarchy(): void {
    this.boardService
      .getBoardHierarchy()
      .subscribe(
        (model: ResponseList<BoardHierarchy>) => {
            if ( model.total > 0 ) {
              this.parentBoardItems = model.data;
            } else {
              this.parentBoardItems = [];
            }
            //this.appAlarmService.changeMessage(model.message);
            // title 노드 텍스트
            // key   데이터 키
            // isLeaf 마지막 노드 여부
            // checked 체크 여부
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
