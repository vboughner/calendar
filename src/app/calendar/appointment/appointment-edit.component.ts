import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styles: []
})
export class AppointmentEditComponent implements OnInit {
  @Input() selectedMonth: number;
  @Input() selectedYear: number;
  @Input() appointmentIndex: number;

  constructor() { }

  ngOnInit() {
  }

}
