import { Component, Self, Optional, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-item-input',
  templateUrl: './form-item-input.component.html',
  styleUrls: ['./form-item-input.component.css']
})
export class FormItemInputComponent implements ControlValueAccessor {

  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() labelText: string = '';
  @Input() placeholder: string = '';
  @Input() itemId: string = '';

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
    //console.log(this.ngControl);
    //console.log(obj.target.validationMessage);
    //console.log(obj.target.validity);
    this._value = obj.target.value;
    this.onChange(this._value);
  }

}
