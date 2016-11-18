import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styles: [`
    .calendar-month-selector {
      margin-bottom: 20px;
    }
    .calendar-month-title {
      margin-top: 0.25em;
    }
  `]
})
export class MonthSelectorComponent implements OnInit {
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  selectedYear: number = 2016;
  selectedMonth: number = 11;        // January is 1, December is 12

  constructor() { }

  ngOnInit() {
  }

}
