import { Component, OnInit, Input, SkipSelf, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { DeptService } from '../../service/dept.service';
import { Dept } from '../../model/dept';
import { ResponseList } from '../../model/response-list';

@Component({
  selector: 'app-dept-select',
  templateUrl: './dept-select.component.html',
  styleUrls: ['./dept-select.component.css']
  /*viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]*/
  /*viewProviders: [
    {
        provide: ControlContainer,
        useExisting: FormGroupDirective
    }
  ]*/
})
export class DeptSelectComponent implements OnInit {

  deptList: Dept[] = [];

  @Input() formControlName: string = '';

  /**
   * component witdh 속성
   */
  @Input() width = "100%";

  constructor(private deptService: DeptService) { }

  ngOnInit() {
    this.getDeptList();
  }

  public getDeptList(): void {
    const params = {isEnabled: true};

    this.deptService
         .getDeptList(params)
         .subscribe(
          (model: ResponseList<Dept>) => {
            this.deptList = model.data;
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

}
