import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkScheduleFormComponent } from './work-schedule-form.component';
import { WorkGroupFormComponent } from './workgroup-form.component';
import { MyWorkGroupGridComponent } from './myworkgroup-grid.component';
import { WorkCalendarComponent } from './work-calendar.component';

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.css']
})
export class WorkgroupComponent implements OnInit {

  scheduleDrawerVisible: boolean = false;
  workGroupDrawerVisible: boolean = false;

  workGroupId: any;

  @ViewChild('myWorkGroupGrid', {static: true}) myWorkGroupGrid!: MyWorkGroupGridComponent;
  @ViewChild('workCalendar', {static: true}) workCalendar!: WorkCalendarComponent;
  @ViewChild('workScheduleForm', {static: false}) workScheduleForm!: WorkScheduleFormComponent;
  @ViewChild('workGroupForm', {static: false}) workGroupForm!: WorkGroupFormComponent;

  constructor() { }

  ngOnInit(): void {
    this.getMyWorkGroupList();
  }

  public getMyWorkGroupList(): void {
    this.closeWorkGroupDrawer();
    this.myWorkGroupGrid.getMyWorkGroupList();
  }

  public getScheduleList(): void {
    this.closeWorkGroupDrawer();
    this.closeScheduleDrawer();

    //this.workCalendar.getScheduleList(this.workGroupId);
  }

  public openScheduleDrawer(): void {
    this.scheduleDrawerVisible = true;
  }

  public closeScheduleDrawer(): void {
    this.scheduleDrawerVisible = false;
  }

  public openWorkGroupDrawer(): void {
    this.workGroupDrawerVisible = true;
  }

  public closeWorkGroupDrawer(): void {
    this.workGroupDrawerVisible = false;
  }

  public newWorkGroup(): void {
    this.workGroupForm.newForm();
    this.openWorkGroupDrawer();
  }

  public modifyWorkGroup(workGroup: any): void {
    this.workGroupForm.getWorkGroup(workGroup.id);
    this.openWorkGroupDrawer();
  }

  public newSchedule(): void {
    this.workScheduleForm.newForm(this.workGroupId);
    this.openScheduleDrawer();
  }

  public workGroupSelect(ids: any): void {
    this.workGroupId = ids;
    this.getScheduleList();
  }

  itemSelect(id: any): void {
    console.log(id);
    this.workScheduleForm.getWorkGroupSchedule(id);
    this.openScheduleDrawer();
  }

  public newSchedule2(param: any): void {
    console.log(param);
    console.log(param.fkWorkGroup);
    this.workScheduleForm.newForm(param.fkWorkGroup);
    this.workScheduleForm.form.get('start')?.setValue(param.date);
    this.workScheduleForm.form.get('end')?.setValue(param.date);
    this.openScheduleDrawer();
  }

}
