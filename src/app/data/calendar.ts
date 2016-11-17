import { Appointment } from './appointment';

/*
 * Data structure for storing the entire calendar.
 * In this simple example, only an array of appointments is stored.
 */
export class Calendar {
  constructor(public appointments: Appointment[]) {};
}
