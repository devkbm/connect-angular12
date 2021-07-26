import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserSessionService } from '../../service/user-session.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { ResponseObject } from '../../model/response-object';
import { User } from '../../model/user-info';

@Component({
    selector: 'app-user-popup',
    templateUrl: './user-popup.component.html',
    styleUrls: ['./user-popup.component.css']
})
export class UserPopupComponent implements OnInit {

    /**
     * 아바타 이미지 경로
     */
    imgSrc: any;
    user: any;

    constructor(private sessionService: UserSessionService,
                private modal: NzModalRef) { }

    ngOnInit(): void {
        this.imgSrc = this.sessionService.getAvartarImageString();
        this.getMyInfo();
    }

    getMyInfo(): void {
      this.sessionService
          .getSessionUserInfo()
          .subscribe(
              (model: ResponseObject<User>) => {
                  if ( model.total > 0 ) {
                      this.user = model.data;
                  }
                  //this.appAlarmService.changeMessage(model.message);
              },
              (err) => {
                  console.log(err);
              },
              () => { }
      );
    }

    destroyModal(): void {
      this.modal.destroy({ data: 'this the result data' });
    }

}
