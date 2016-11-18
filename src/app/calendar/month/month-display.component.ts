import { Component, OnInit } from '@angular/core';

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
      min-height: 100px;
    }
  `]
})
export class MonthDisplayComponent implements OnInit {
  weekDayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysInWeek: number[] = [0, 1, 2, 3, 4, 5, 6];

  selectedYear: number = 2016;
  selectedMonth: number = 11;        // January is 1, December is 12
  numDaysInMonth: number = 31;       // number of days in the selected month
  weekdayFirstOfMonth: number = 2;   // which weekday selected month begins, Sunday is 0, Saturday is 6
  weeksInMonth: number[] = [0,1,2,3,4]; // an element for each weeks that must appear in calendar for selected month (usually 5 or 6 elements)


  constructor() { }

  ngOnInit() {
  }

  // returns the number that should be showing in the month grid at the given location,
  // (week, day) is (0, 0) at the top left of the calendar, returns -1 if the selectedMonth
  // doesn't have a day in the given location
  dayInChart(week: number, day: number) {
    const dayInChart = (week * 7) + day - this.weekdayFirstOfMonth;
    if (dayInChart >= 0 && dayInChart < this.numDaysInMonth) {
      return dayInChart + 1;
    }
    else {
      return -1;
    }
  }

  // returns true if there should be a month number showing in the month grid at the given location,
  // (week, day) is (0, 0) at the top left of the calendar
  hasDayInChart(week: number, day: number) {
    return(this.dayInChart(week, day) != -1);
  }
}
