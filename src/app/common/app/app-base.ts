import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { ResponseObject } from '../model/response-object';
import { WebResource } from '../model/web-resource';
import { ProgramService } from '../service/program.service';
import { AppInjector } from './app-injector.service';

export class AppBase {

  protected appId: string = '';

  private programService: ProgramService;

  constructor(protected _location: Location) {
    this.programService = AppInjector.injector.get(ProgramService);
  }

  goBack() {
    this._location.back();
  }

  goFoward() {
    this._location.forward();
  }

  getAppInfo(): Observable<ResponseObject<WebResource>> {
    return this.programService.getProgram(this.appId);
  }

}
