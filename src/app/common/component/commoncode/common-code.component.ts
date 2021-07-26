import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CommonCodeFormComponent } from './common-code-form.component';
import { CommonCodeTreeComponent } from './common-code-tree.component';
import { AppBase } from '../../app/app-base';
import { CommonCodeService } from '../../service/common-code.service';
import { CommonCode } from '../../model/common-code';
import { ResponseList } from '../../model/response-list';

@Component({
  selector: 'app-common-code',
  templateUrl: './common-code.component.html',
  styleUrls: ['./common-code.component.css']
})
export class CommonCodeComponent extends AppBase implements OnInit {

  optionList: CommonCode[] = [];

  queryKey = 'COM';
  queryValue = '';
  selectedCode = '';

  @ViewChild('commonCodeTree', {static: true})
  tree!: CommonCodeTreeComponent;

  @ViewChild('commonCodeForm', {static: false})
  form!: CommonCodeFormComponent;

  constructor(location: Location,
              private commonCodeService: CommonCodeService) {
      super(location);
  }

  ngOnInit(): void {
    this.getSystemTypeCode();
  }

  public getCommonCodeTree(): void {
    this.tree.getCommonCodeHierarchy(this.queryKey);
    this.form.getCommonCodeHierarchy();
  }

  public newForm(): void {
      this.form.newForm(this.selectedCode);
  }

  public saveCommonCode(): void {
      this.form.submitCommonCode();
  }

  public deleteCommonCode(): void {
      this.form.deleteCommonCode();
  }

  public selectedItem(item: any): void {
      this.selectedCode = item.id;
      this.form.getCommonCode(item.id);
  }

  public getSystemTypeCode(): void {
    this.commonCodeService
      .getCommonCodeListByParentId('COMSYSTEM')
      .subscribe(
          (model: ResponseList<CommonCode>) => {
            this.optionList = model.data;
            this.queryKey = this.optionList[0].code;
            this.tree.getCommonCodeHierarchy(this.queryKey);
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

}
