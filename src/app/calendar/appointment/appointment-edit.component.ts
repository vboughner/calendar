import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Appointment} from '../../data/appointment';
import {StorageService} from '../../data/storage.service';

/*
 * Displays form for editing a single appointment, and can be used both
 * for editing an appointment or addings a new one.
 */
@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styles: []
})
export class AppointmentEditComponent implements OnInit {
  @Input() selectedMonth: number;
  @Input() selectedYear: number;
  @Input() appointmentIndex: string;
  isAdd: boolean;
  selectedAppointment: Appointment;
  calculatedDay: number;
  calculatedHour: number;
  calculatedMinute: number;
  calculatedAmPm: string;
  calculatedDuration: number;

  constructor(private storage: StorageService, private router: Router) {}

  ngOnInit() {
    if (this.appointmentIndex === 'new') {
      this.isAdd = true;
      this.selectedAppointment = new Appointment('','', new Date(this.selectedYear, this.selectedMonth - 1, 1), 30);
    } else {
      this.isAdd = false;
      this.selectedAppointment = this.storage.getAppointment(Number(this.appointmentIndex));
    }

    this.calculatedDay = this.selectedAppointment.startTime.getDate();
    this.calculatedHour = this.selectedAppointment.startTime.getHours();
    this.calculatedMinute = this.selectedAppointment.startTime.getMinutes();
    this.calculatedDuration = this.selectedAppointment.duration;
    if (this.calculatedHour > 11) {
      this.calculatedHour = this.calculatedHour - 12;
      this.calculatedAmPm = 'pm';
    } else {
      this.calculatedAmPm = 'am';
    }
    if (this.calculatedHour === 0) {
      this.calculatedHour = 12;
    }
  }

  onSubmit(value: any) {
    let hour: number = Number(value.hour);
    if (hour === 12) {
      hour = 0;
    }
    if (value.ampm === 'pm') {
      hour = hour + 12;
    }

    let submittedStartDate: Date =
      new Date(Number(value.year), Number(value.month - 1), Number(value.day), hour, Number(value.minute));
    let appt = new Appointment(value.name, value.description, submittedStartDate, value.duration);

    if (this.isAdd) {
      this.storage.addAppointment(appt);
    } else {
      this.storage.editAppointment(this.selectedAppointment, appt);
    }

    this.router.navigate(['/calendar/' + this.selectedYear + '/' + this.selectedMonth]);
  }

  onCancel() {
    this.router.navigate(['/calendar/' + this.selectedYear + '/' + this.selectedMonth]);
  }
}
