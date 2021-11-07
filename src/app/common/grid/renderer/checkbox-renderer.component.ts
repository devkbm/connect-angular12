import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-checkbox-renderer',
  template: `
    <label nz-checkbox [(ngModel)]="_value" [nzDisabled]="disabled" (click)="onClick($event)" (change)="onChange($event)">
      {{label}}
    </label>
  `,
  styles: []
})
export class CheckboxRendererComponent implements ICellRendererAngularComp {

  params: any;
  disabled: any;
  label: string;
  _value: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;

    this.label = this.params.label || null;
    this.disabled = this.params.disabled;
    this._value = params.data[this.params.colDef.field];
  }

  refresh(params: any): boolean {
    return true;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
      };

      this.params.onClick(params);
    }
  }

  onChange(event: any) {
    this.params.data[this.params.colDef.field] = this._value;
  }


}
