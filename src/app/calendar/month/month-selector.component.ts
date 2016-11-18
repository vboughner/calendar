import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

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
export class MonthSelectorComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;

  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  selectedYear: number;
  selectedMonth: number;        // January is 1, December is 12, need to adjust by -1 before using with the monthNames array

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(
      (params: any) => {
        if (params['year'] && params['month']) {
          this.selectedYear = params['year'];
          this.selectedMonth = params['month'];
        } else {
          // when no year and month are selected in the URL, use today's month
          // note that JavaScript Date uses 0-based month numbers, so need to adjust by +1
          const currentTime = new Date();
          this.selectedMonth = currentTime.getMonth() + 1;
          this.selectedYear = currentTime.getFullYear();
        }
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onPrevMonth() {
    let month: number = this.selectedMonth;
    let year: number = this.selectedYear;

    month--;
    if (month < 1) {
      month = 12;
      year--;
    }

    this.router.navigate(['/calendar/' + year + '/' + month]);
  }

  onNextMonth() {
    let month: number = this.selectedMonth;
    let year: number = this.selectedYear;

    month++;
    if (month > 12) {
      month = 1;
      year++;
    }

    this.router.navigate(['/calendar/' + year + '/' + month]);
  }
}
