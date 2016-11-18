import { Injectable } from '@angular/core';

import { Appointment} from './appointment';
import { Calendar} from './calendar';

/*
 * Storage service provides local storage for the calendar and appointments.
 * It's meant to be used without a server side, so the storage for each
 * user is done locally, using their own browser's local storage facility.
 */
@Injectable()
export class StorageService {
  private calendar: Calendar;
  private calendarLoaded: boolean = false;

  constructor() {}

  private loadCalendar(): void {
    if (!this.calendarLoaded) {
      // todo: implement local storage later, for now we start with mock data
      this.calendar = new Calendar([]);
      this.calendarLoaded = true;
    }
  }

  private saveCalendar(): void {
    // todo: implement to save the calendar to local storage
    // for now, do nothing, and calendar is lost upon reload
    // console.log('saved calendar');
    // console.log(this.calendar);
  }

  getCalendar(): Calendar {
    this.loadCalendar();
    return this.calendar;
  }

  getAppointment(index: number): Appointment {
    this.loadCalendar();
    return this.calendar.appointments[index];
  }

  getAppointmentIndex(a: Appointment): number {
    this.loadCalendar();
    const index = this.calendar.appointments.indexOf(a);
    return index;
  }

  addAppointment(a: Appointment): number {
    this.loadCalendar();
    let index: number = this.calendar.appointments.push(a);
    this.saveCalendar();
    return index;
  }

  editAppointment(old: Appointment, updated: Appointment): void {
    this.loadCalendar();
    const index = this.calendar.appointments.indexOf(old);
    this.calendar.appointments[index] = updated;
    this.saveCalendar();
  }

  deleteAppointment(old: Appointment): void {
    this.loadCalendar();
    const index = this.calendar.appointments.indexOf(old);
    this.calendar.appointments.splice(index, 1);
    this.saveCalendar();
  }
}