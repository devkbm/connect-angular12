import { Holiday } from './../../model/holiday';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { ResponseList } from 'src/app/common/model/response-list';
import { HolidayService } from '../../service/holiday.service';

@Component({
  selector: 'app-holiday-grid',
  templateUrl: './holiday-grid.component.html',
  styleUrls: ['./holiday-grid.component.css']
})
export class HolidayGridComponent extends AggridFunction implements OnInit {

  gridList: Holiday[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private holidayService: HolidayService) {

    super();

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          iconType: 'form'
        }
      },
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellStyle: {'text-align': 'center'}
      },
      { headerName: '일자',     field: 'date',        width: 150, cellStyle: {'text-align': 'center'} },
      { headerName: '요일',     field: 'dayOfWeek',   width: 50, cellStyle: {'text-align': 'center'} },
      { headerName: '휴일명',   field: 'holiday.holidayName', width: 80 },
      { headerName: '비고',     field: 'holiday.comment',     width: 200 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowNodeId = (data: any) => {
        return data.date;
    };
  }

  ngOnInit(): void {
    this.getGridList();
  }

  private onEditButtonClick(e: any): void {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(): void {

    this.holidayService
        .getHolidayList('20200101', '20201231')
        .subscribe(
          (model: ResponseList<Holiday>) => {
              if (model.total > 0) {
                  this.gridList = model.data;
              } else {
                  this.gridList = [];
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

  selectionChanged(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any): void {
    this.rowDoubleClicked.emit(event.data);
  }

}
