import { Component, Self, Optional, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-item-select',
  templateUrl: './form-item-select.component.html',
  styleUrls: ['./form-item-select.component.css']
})
export class FormItemSelectComponent implements ControlValueAccessor {

  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() itemId: string = '';
  @Input() options!: any[];
  @Input() label: string = 'label';
  @Input() value: string = 'value';

  @Input() errorTpl: any;

  onChange: any = (_:any) => {};
  onTouched: any = () => {};

  _value: any ='';

  constructor(@Self()  @Optional() private ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {
    this._value = obj;
    this.onChange(this._value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  changeFn(obj: any) {
    this.onChange(obj);
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

}
