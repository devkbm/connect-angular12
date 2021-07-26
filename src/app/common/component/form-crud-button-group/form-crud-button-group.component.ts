import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-crud-button-group',
  templateUrl: './form-crud-button-group.component.html',
  styleUrls: ['./form-crud-button-group.component.css']
})
export class FormCrudButtonGroupComponent implements OnInit {

  @Output() closeClick = new EventEmitter();
  @Output() searchClick = new EventEmitter();
  @Output() saveClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeButtonClick(event: any) {
    this.closeClick.emit(event);
  }

  searchButtonClick(event: any) {
    this.searchClick.emit(event);
  }

  saveButtonClick() {
    this.saveClick.emit();
  }

  deleteButtonClick() {
    this.deleteClick.emit();
  }

}
