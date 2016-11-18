import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

/*
 * Calendar component looks at the routing instructions in the URL and
 * figures out which sub-component is needed, it will one of these three:
 *   1. month display, view all the appointments this month
 *   2. appointment display, view details on a single appointment
 *   3. appointment edit, edit an existing appointment, or add a new one
 *
 * Calendar component passes routing information down into sub-components
 * so that they don't have to decipher the routing again.
 */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styles: []
})
export class CalendarComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;

  selectedYear: number;
  selectedMonth: number;    // month numbers run from 1 - 12
  isMonthDisplay: boolean;  // true when the month display should be shown, false for appointment display/edit
  appointmentIndex: string; // is 'new' when adding an appointment, otherwise is the index of the appointment
  isEdit: boolean;          // is true when editing or adding an existing appointment

  constructor(private route:ActivatedRoute) { }

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

        // figure out which sub-components should be showing for this route
        if (params['appointment']) {
          this.appointmentIndex = params['appointment'];
          this.isMonthDisplay = false;
          if (params['edit'] || this.appointmentIndex === 'new') {
            this.isEdit = true;
          } else {
            this.isEdit = false;
          }
        } else {
          this.appointmentIndex = null;
          this.isMonthDisplay = true;
          this.isEdit = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
