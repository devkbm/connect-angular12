import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ProgramGridComponent } from './program-grid.component';
import { ProgramFormComponent } from './program-form.component';
import { AppBase } from '../../app/app-base';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent extends AppBase  implements OnInit {

  drawerVisible = false;

  queryKey = 'resourceCode';
  queryValue = '';

  @ViewChild('programGrid', {static: false})
  grid!: ProgramGridComponent;

  @ViewChild('programForm', {static: false})
  form!: ProgramFormComponent;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit(): void {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  getProgramList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getProgramList(params);
  }

  initForm(): void {
    this.form.newForm();
    this.openDrawer();
  }

  saveProgram(): void {
    this.form.submitProgram();
  }

  deleteProgram(): void {
    this.form.deleteProgram();
  }

  selectedItem(item: any): void {
    // this.form.programForm.patchValue(item);
  }

  editDrawerOpen(item: any): void {
    this.form.getProgram(item.resourceCode);
    this.openDrawer();
  }

}
