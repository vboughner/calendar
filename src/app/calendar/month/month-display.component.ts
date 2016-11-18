import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Appointment} from '../../data/appointment';
import {StorageService} from '../../data/storage.service';
import {Calendar} from "../../data/calendar";

/*
 * Displays a chart/grid of the currently selected month.
 */
@Component({
  selector: 'app-month-display',
  templateUrl: './month-display.component.html',
  styles: [`
    .calendar-day-box {
      background-color: lightgray;
      margin-top: 2px;
      margin-left: 2px;
      min-height: 150px;
      padding-top: 5px;
    }
  `]
})
export class MonthDisplayComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;

  weekDayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysInWeek: number[] = [0, 1, 2, 3, 4, 5, 6];

  selectedYear: number;
  selectedMonth: number;        // January is 1, December is 12
  numDaysInMonth: number;       // number of days in the selected month
  weekdayFirstOfMonth: number;  // which weekday selected month begins, Sunday is 0, Saturday is 6
  weeksInMonth: number[];       // an element for each weeks that must appear in calendar for selected month (usually 5 or 6 elements)

  constructor(private route: ActivatedRoute, private router: Router, private storage: StorageService) {}

  // returns a number for the weekday of the first day of the given month,
  // useful for calculations, Sunday is 0, Monday is 1, ..., Saturday is 6
  private getWeekdayFirstOfMonth(year: number, month: number): number {
    const day: number = new Date(year, month - 1, 1).getDay();
    return day;
  }

  // returns number of days in the given month
  private getNumDaysInMonth(year: number, month: number): number {
    const numDays = new Date(year, month, 1, -1).getDate();
    return numDays;
  }

  // figures out how many weeks must show in the calendar (4, 5, or 6) for the days to fit,
  // returns an array of the week numbers, starting at 0 (such as [0,1,2,3,4])
  private getWeeksInMonth(numDaysInMonth: number, weekdayFirstOfMonth: number): number[] {
    const numWeeks = Math.ceil((numDaysInMonth + weekdayFirstOfMonth) / 7);
    let weekArray = [];
    for (let i = 0; i < numWeeks; i++) {
      weekArray.push(i);
    }
    return weekArray;
  }

  ngOnInit() {
    // keep an eye out for changes to the URL that indicate we're looking at a new month
    this.routeSubscription = this.route.params.subscribe(
      (params: any) => {
        if (params['year'] && params['month']) {
          this.selectedYear = params['year'];
          this.selectedMonth = params['month'];
        } else {
          // when no year and month are selected in the URL, use today's month
          const currentTime = new Date();
          this.selectedMonth = currentTime.getMonth() + 1;
          this.selectedYear = currentTime.getFullYear();
        }

        // now that we know the month, figure out other things we need to know about this month's calendar display
        this.numDaysInMonth = this.getNumDaysInMonth(this.selectedYear, this.selectedMonth);
        this.weekdayFirstOfMonth = this.getWeekdayFirstOfMonth(this.selectedYear, this.selectedMonth);
        this.weeksInMonth = this.getWeeksInMonth(this.numDaysInMonth, this.weekdayFirstOfMonth);

        // console.log(this.numDaysInMonth);
        // console.log(this.weekdayFirstOfMonth);
        // console.log(this.weeksInMonth);
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  // returns the number that should be showing in the month grid at the given location,
  // (week, day) is (0, 0) at the top left of the calendar, returns -1 if the selectedMonth
  // doesn't have a day in the given location
  dayInChart(week: number, day: number): number {
    const dayInChart = (week * 7) + day - this.weekdayFirstOfMonth;
    console.log('dayInChart = ' + dayInChart + ', weekdayFirstOfMonth=' + this.weekdayFirstOfMonth + ', day=' + day);
    if (dayInChart >= 0 && dayInChart < this.numDaysInMonth) {
      return dayInChart + 1;
    } else {
      return -1;
    }
  }

  // returns true if there should be a month number showing in the month grid at the given location,
  // (week, day) is (0, 0) at the top left of the calendar
  hasDayInChart(week: number, day: number) {
    return(this.dayInChart(week, day) !== -1);
  }

  // return an array of appointments for this day, sorted by start time
  private appointmentsInChart(week: number, day: number): Appointment[] {
    let selectedDay: number = this.dayInChart(week, day);
    let returnedAppointments: Appointment[] = [];
    let c: Calendar = this.storage.getCalendar();
    for (let i = 0; i < c.appointments.length; i++) {
      let a: Appointment = c.appointments[i];
      if (a.startTime.getFullYear() === Number(this.selectedYear) &&
          a.startTime.getMonth() === this.selectedMonth - 1 &&
          a.startTime.getDate() === selectedDay) {
        returnedAppointments.push(a);
      }
    }

    // sort array by start time
    returnedAppointments.sort(function(a, b) {
        var startTimeA = a.startTime;
        var startTimeB = b.startTime;
        return (startTimeA < startTimeB) ? -1 : (startTimeA > startTimeB) ? 1 : 0;
    });

    return returnedAppointments;
  }

  // returns a short string with start time and name of appointment
  private getAppoinmentTime(a: Appointment): string {
    let namePart: string = a.name;
    if (namePart.length > 10) {
      namePart = namePart.substring(0, 9) + '...';
    }

    let hour: number = a.startTime.getHours();
    let ampm: string = 'am';
    if (hour > 11) {
      hour = hour - 12;
      ampm = 'pm';
    }
    if (hour === 0) {
      hour = 12;
    }
    let minute: number = a.startTime.getMinutes();
    return hour + ':' + (minute < 10 ? '0' + minute : minute) + ampm + ' ' + namePart;
  }

  // return an array of appointment text for this day
  apptsInChart(week: number, day: number): {name: string, time: string}[] {
    let appts: Appointment[] = this.appointmentsInChart(week, day);
    let returnedText: {name: string, time: string}[] = [];
    for (let i = 0; i < appts.length; i++) {
      let a: {name: string, time: string} = { name: '', time: '' };
      a.name = '(' + appts[i].duration + ' minutes) ' + appts[i].name;
      a.time = this.getAppoinmentTime(appts[i]);
      returnedText.push(a);
    }
    return returnedText;
  }

  // navigate to the newly selected appointment
  onApptInChart(week: number, day: number, index: number) {
    let appts: Appointment[] = this.appointmentsInChart(week, day);
    let selectedOne: Appointment = appts[index];
    const appointmentIndex: number = this.storage.getAppointmentIndex(selectedOne);
    this.router.navigate(['/calendar/' + this.selectedYear + '/' + this.selectedMonth + '/' + appointmentIndex]);
  }
}
