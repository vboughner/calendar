/*
 * Data structure for storing a single appointment.
 */
export class Appointment {
  constructor(public title: string, public description: string, public startTime: Date, public endTime: Date) {};
}
