import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ResponseList } from '../../../../common/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule';

import { EventApi, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking


@Component({
selector: 'app-work-calendar',
templateUrl: './work-calendar.component.html',
styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

    @Input() fkWorkGroup: string = '';

    fromDate: Date = new Date();
    toDate: Date = new Date();

    calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];

    calendarOptions: CalendarOptions = {
      // display
      locale: koLocale,
      themeSystem: 'standard',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      weekNumbers: true,
      selectable: true,
      // events
      events: (info, successCallback, failureCallback) => {
        const param = {
          fkWorkGroup : this.fkWorkGroup,
          fromDate: this.datePipe.transform(info.start, 'yyyyMMdd'),
          toDate: this.datePipe.transform(info.end, 'yyyyMMdd')
        };
        console.log(info);
        this.workGroupService.getWorkScheduleList(param)
        .subscribe(
            (model: ResponseList<WorkGroupSchedule>) => {
              successCallback(model.data.map((e) => {
                this.calendarComponent.getApi().render();
                return {
                  id : e.id.toString(),
                  title : e.title,
                  start : e.start,
                  end : e.end,
                  allDay : e.allDay,
                  color: e.color
                }
              }));
            },
            (err) => {},
            () => {}
        )
      },
      eventClick: this.onEventClick.bind(this),
      dateClick: this.onDateClick.bind(this)
    };

    @Output() itemSelected = new EventEmitter();
    @Output() newDateSelected = new EventEmitter();

    @ViewChild('calendar', {static: false}) calendarComponent!: FullCalendarComponent;

    constructor(private workGroupService: WorkGroupService,
                private datePipe: DatePipe) { }

    ngOnInit(): void {
      //this.getScheduleList(this.fkWorkGroup);
      this.fromDate = new Date('2020-10-01');
      this.toDate = new Date('2020-10-30');
      //this.getScheduleList('55');
    }

    onChange(result: Date): void {
        // console.log('onChange: ', result.toLocaleString());
        // console.log(this.datePipe.transform(result, 'yyyyMM'));
        console.log(result.toISOString());

        const calendarApi = this.calendarComponent.getApi();
        // calendarApi.next();
        console.log(calendarApi);
        calendarApi.select(result, result);

        //this.getScheduleList(this.fkWorkGroup, null);
    }

    onEventClick(param: any): void {
        console.log(param);
        console.log(param.event.id);
        this.itemSelected.emit(param.event.id);
    }

    onDateClick(args: DateClickArg): void {
        console.log(args);
        this.newDateSelected.emit({fkWorkGroup: this.fkWorkGroup, date: args.date});
    }

    onDatesRender(param: any): void {
      console.log(param);
      //console.log(param[0]._context.viewApi);

      const endDate: Date = param[0]._context.viewApi.currentEnd;
      endDate.setDate(endDate.getDate() - 1);

      this.fromDate = param[0]._context.viewApi.currentStart;
      this.toDate = endDate;
      // console.log(param.view.currentStart);
      // console.log(param.view.currentEnd);
      // console.log(endDate);
      //this.getScheduleList(this.fkWorkGroup);

    }

    test(param: any): void {
      console.log(param);
    }

    //#endregion

}
