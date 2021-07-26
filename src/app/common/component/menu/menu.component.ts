import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MenuGroupFormComponent } from './menu-group-form.component';
import { MenuGroupGridComponent } from './menu-group-grid.component';
import { MenuGridComponent } from './menu-grid.component';
import { MenuFormComponent } from './menu-form.component';
import { AppBase } from '../../app/app-base';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AppBase implements OnInit {

  menuGroupFormVisible = false;
  menuFormVisible = false;
  selectedMenuGroupCode: string = '';

  menuGroupQueryKey: string = 'menuGroupCode';
  menuGroupQueryValue: string = '';
  menuQueryKey: string = 'menuCode';
  menuQueryValue: string = '';

  @ViewChild('menuGroupGrid', {static: false})
  menuGroupGrid!: MenuGroupGridComponent;

  @ViewChild('menuGroupForm', {static: false})
  menuGroupForm!: MenuGroupFormComponent;

  @ViewChild('menuGrid', {static: false})
  menuGrid!: MenuGridComponent;

  @ViewChild('menuForm', {static: false})
  menuForm!: MenuFormComponent;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  newMenuGroupForm(): void {
    this.menuGroupForm.newForm();
    this.menuGroupFormVisible = true;
  }

  menuGroupFormOpen(item: any): void {
    this.menuGroupForm.getMenuGroup(item.menuGroupCode);
    this.menuGroupFormVisible = true;
  }

  menuGroupFormClose(): void {
    this.menuGroupFormVisible = false;
  }

  newMenu(): void {
    this.menuForm.newForm(this.selectedMenuGroupCode);
    this.menuFormVisible = true;
  }

  menuFormOpen(item: any): void {
    this.menuForm.getMenu(item.menuCode);
    this.menuFormVisible = true;
  }

  menuFormClose(): void {
    this.menuFormVisible = false;
  }

  getMenuGroupList(): void {
    let params: any = new Object();
    if ( this.menuGroupQueryValue !== '') {
      params[this.menuGroupQueryKey] = this.menuGroupQueryValue;
    }

    this.menuGroupFormClose();
    this.menuGrid.clearData();
    this.menuGroupGrid.getMenuGroupList(params);
  }

  getMenuList(): void {
    let params: any = new Object();
    params['menuGroupCode'] = this.selectedMenuGroupCode;

    if ( this.menuQueryValue !== '') {
      params[this.menuQueryKey] = this.menuQueryValue;
    }

    this.menuFormClose();
    this.menuGrid.getMenuList(params);
  }

  selectMenuGroup(item: any): void {
    this.selectedMenuGroupCode = item.menuGroupCode;
    this.getMenuList();
  }


}
