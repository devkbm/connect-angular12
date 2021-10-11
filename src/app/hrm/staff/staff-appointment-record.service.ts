import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/common/service/data.service';
import { ResponseList } from 'src/app/common/model/response-list';
import { ResponseObject } from 'src/app/common/model/response-object';
import { StaffAppointmentRecord } from './staff-appointment-record.model';

@Injectable({
  providedIn: 'root'
})
export class StaffAppointmentRecordService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm/staff', http, tokenExtractor);
  }

  getStaffAppointmentRecord(staffId: string, id: string): Observable<ResponseObject<StaffAppointmentRecord>> {
    const url = `${this.API_URL}/${staffId}/appointmentrecord/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<StaffAppointmentRecord>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<StaffAppointmentRecord>>('getStaffAppointmentRecord', undefined))
    );
  }

  saveStaffAppointmentRecord(obj: StaffAppointmentRecord): Observable<ResponseObject<StaffAppointmentRecord>> {
    const url = `${this.API_URL}/${obj.staffId}/appointmentrecord`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<StaffAppointmentRecord>>(url, obj, options).pipe(
      catchError(this.handleError<ResponseObject<StaffAppointmentRecord>>('saveStaffAppointmentRecord', undefined))
    );
  }
}
