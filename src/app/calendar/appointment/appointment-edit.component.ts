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
  calculatedMinute: string;
  calculatedAmPm: string;
  calculatedDuration: number;

  private isErrorMessageVisible: boolean = false;
  private errorMessage: string;

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
    let minute: number = this.selectedAppointment.startTime.getMinutes();
    this.calculatedMinute = (minute < 10 ? String('0' + minute) : String(minute));
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

  onError(message: string) {
    this.errorMessage = message;
    this.isErrorMessageVisible = true;
  }

  cancelError() {
    this.isErrorMessageVisible = false;
  }

  // returns true if the values are ok for a new appointment,
  // otherwise shows the error window and returns false
  private submittedAppointmentPassesTests(value: any): boolean {
    if (value.name.length === 0) {
      this.onError('Please enter a name and try again.');
      return false;
    }

    if (value.year.length === 0 || value.year < 1 || value.year > 5000) {
      this.onError('Please enter a year between 1 and 5000 and try again.');
      return false;
    }

    if (value.month.length === 0 || value.month < 1 || value.month > 12) {
      this.onError('Please enter a month between 1 and 12 and try again.');
      return false;
    }

    const numDaysInMonth: number = new Date(Number(value.year), Number(value.month), 1, -1).getDate();
    if (value.day.length === 0 || value.day < 1 || value.day > numDaysInMonth) {
      this.onError('Please enter a day between 1 and ' + numDaysInMonth + ' and try again.');
      return false;
    }

    if (value.hour.length === 0 || value.hour < 1 || value.hour > 12) {
      this.onError('Please enter an hour between 1 and 12 and try again.');
      return false;
    }

    if (value.minute.length === 0 || value.minute < 0 || value.minute > 59) {
      this.onError('Please enter an minute between 0 and 59 and try again.');
      return false;
    }

    if (value.ampm.length === 0 || (value.ampm !== 'am' && value.ampm !== 'pm')) {
      this.onError('Please enter either "am" or "pm" and try again.');
      return false;
    }

    if (value.duration.length === 0 || value.duration < 1 || value.duration > 60 * 24) {
      this.onError('Please enter a valid duration (in minutes) and try again.');
      return false;
    }

    return true;
  }

  // check this appointment is not in the past and does not overlap another appointment
  private checkAppointmentTiming(a: Appointment): boolean {
    const now = new Date();
    if (a.startTime < now) {
      this.onError('An appointment may not begin in the past, please update the start date and/or time and try again.');
      return false;
    }

    const calendar = this.storage.getCalendar();
    const newStartTime: Date = a.startTime;
    const newEndTime: Date = new Date(newStartTime.getTime() + (60000 * a.duration));

    for (let i = 0; i < calendar.appointments.length; i++) {
      if (!this.isAdd && this.selectedAppointment !== calendar.appointments[i]) {
        let apptStartTime: Date = calendar.appointments[i].startTime;
        let apptEndTime = new Date(apptStartTime.getTime() + (60000 * calendar.appointments[i].duration));
        if ((newStartTime >= apptStartTime && newStartTime < apptEndTime) ||
          (newEndTime > apptStartTime && newEndTime <= apptEndTime)) {
          this.onError('This appointment overlaps with an existing appointment called "' + calendar.appointments[i].name +
            '", please update the start date, time, and/or duration and try again.');
          return false;
        }
      }
    }

    return true;
  }

  onSubmit(value: any) {
    if (this.submittedAppointmentPassesTests(value)) {
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

      if (this.checkAppointmentTiming(appt)) {
        if (this.isAdd) {
          this.storage.addAppointment(appt);
        } else {
          this.storage.editAppointment(this.selectedAppointment, appt);
        }

        this.router.navigate(['/calendar/' + this.selectedYear + '/' + this.selectedMonth]);
      }
    }
  }

  onCancel() {
    this.router.navigate(['/calendar/' + this.selectedYear + '/' + this.selectedMonth]);
  }
}
