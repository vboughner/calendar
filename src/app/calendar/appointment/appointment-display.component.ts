import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-appointment-display',
  templateUrl: './appointment-display.component.html',
  styles: []
})
export class AppointmentDisplayComponent implements OnInit {
  @Input() selectedMonth: number;
  @Input() selectedYear: number;
  @Input() appointmentIndex: number;

  constructor() { }

  ngOnInit() {
  }

}
