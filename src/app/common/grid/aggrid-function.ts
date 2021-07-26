import { Injectable } from '@angular/core';
import { ButtonRendererComponent } from './renderer/button-renderer.component';
import { CheckboxRendererComponent } from './renderer/checkbox-renderer.component';

@Injectable()
export class AggridFunction {

  getRowNodeId: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;

  columnDefs: object[];
  defaultColDef: {};

  style = {
      width: '100%',
      height: '100%'
  };

  constructor() {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      checkboxRenderer: CheckboxRendererComponent
    };

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    /*
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function() {
        setTimeout(function() {
            params.api.sizeColumnsToFit();
        });
    });
    params.api.sizeColumnsToFit();
    */
  }

  setWidthAndHeight(width: any, height: any) {
    this.style = {
      width: width,
      height: height
    };
  }

  getSelectedRows() {
    return this.gridApi.getSelectedRows();
  }

  /**
   * @description index에 해당하는 rowNode를 리턴한다.
   * @param index 행번호
   * @return rowNode
   */
  public getRowNodeByIndex(index: number) {
    return this.gridApi.getDisplayedRowAtIndex(index);
  }

  /**
   * @description id에 해당하는 rowNode를 리턴한다.
   * @param id id
   * @return rowNode
   */
  public getRowNode(id: any) {
    return this.gridApi.getRowNode(id);
  }

  /**
   * @description 특정 CELL을 선택한다.
   * @param rowIndex 행번호
   * @param colKey column key
   */
  public selectCell(rowIndex: number, colKey: string) {
    this.gridApi.setFocusedCell(rowIndex, colKey);
  }

  /**
   * @description 특정 행을 선택한다.
   * @param rowIndex 행번호
   */
  public selectRow(rowIndex: number) {
    this.gridApi.forEachNode( (node: any) => {
      if (node.rowIndex === rowIndex) {
        node.setSelected(true);
      }
    });
  }

  /**
   * @description 행추가
   * @param newItem Object
   */
  public addRow(newItem: object) {
    const res = this.gridApi.updateRowData({ add: [newItem] });
  }

  /**
   * @description 그리드 초기화
   */
  public clearData() {
    this.gridApi.setRowData([]);
  }

  /**
   * @description 특정 컬럼에 data를 입력한다.
   * @param rowNode rowNode 객체
   * @param colnm column key
   * @param data data
   */
  public setCellData(rowNode: any, colnm: any, data: any) {
    rowNode.setDataValue(colnm, data);
  }

  /**
   * @description 특정 row에 data를 입력한다.
   * @param rowNode  rowNode 객체
   * @param data row에 적용될 data(객체)
   */
  public setRowData(rowNode: any, data: object) {
    rowNode.setData(data);
  }

  public autoSizeAll(): void {
    const allColumnIds: any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function(column: any) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  public sizeToFit(): void {
    if (this.gridApi == null) {
      return;
    }
    this.gridApi.sizeColumnsToFit();
  }

}
