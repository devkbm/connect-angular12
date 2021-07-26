import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';


import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { EmployeeCombo } from '../model/employee-combo';

@Injectable({
  providedIn: 'root'
})
export class HrmCoreService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  /**
   * 사원명단을 조회한다.
   */
  getEmployeeList(): Observable<ResponseList<EmployeeCombo>> {
    const url = `${this.API_URL}/employee`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
     };

    return this.http.get<ResponseList<EmployeeCombo>>(url, options).pipe(
      catchError(this.handleError<ResponseList<EmployeeCombo>>('getEmployeeList', undefined))
    );
  }
}
