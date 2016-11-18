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
  private appKey = "calendarByVanBoughner";

  constructor() {}

  private loadCalendar(): void {
    if (!this.calendarLoaded) {
      let jsonInStorage = window.localStorage.getItem(this.appKey);
      if (jsonInStorage === null) {
        this.calendar = new Calendar([]);
      }
      else {
        this.calendar = JSON.parse(jsonInStorage);
        for (let i = 0; i < this.calendar.appointments.length; i++) {
          this.calendar.appointments[i].startTime = new Date(String(this.calendar.appointments[i].startTime));
        }
      }
      this.calendarLoaded = true;
      // console.log('loaded calendar');
      // console.log(this.calendar);
    }
  }

  private saveCalendar(): void {
    window.localStorage.setItem(this.appKey, JSON.stringify(this.calendar));
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
