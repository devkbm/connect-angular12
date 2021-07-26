import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AuthorityGridComponent } from './authority-grid.component';
import { AuthorityFormComponent } from './authority-form.component';
import { AppBase } from '../../app/app-base';
import { ResponseObject } from '../../model/response-object';
import { WebResource } from '../../model/web-resource';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent extends AppBase implements OnInit {

  drawerVisible = false;

  queryKey = 'authority';
  queryValue = '';

  @ViewChild('authGrid', {static: false})
  grid!: AuthorityGridComponent;

  @ViewChild('authForm', {static: false})
  form!: AuthorityFormComponent;

  constructor(location: Location) {
    super(location);
    this.appId = "COM002";
  }

  ngOnInit(): void {
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  openDrawer(): void {
    this.getAppInfo().subscribe(
      (model: ResponseObject<WebResource>) => {
        console.log(model);
      },
      (err) => {
        console.log(err);
      },
      () => { }
    );

    this.drawerVisible = true;
  }

  selectedItem(item: any): void {
    this.form.fg.patchValue(item);
  }

  editDrawOpen(item: any): void {
    this.form.getAuthority(item.authority);

    this.openDrawer();
  }

  getAuthorityList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getAuthority(params);
  }

  deleteAuthority(): void {
    this.form.deleteAuthority();
  }

  initForm(): void {
    this.form.newForm();
    this.openDrawer();
  }

}
