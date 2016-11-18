/*
 * Data structure for storing a single appointment.
 * Duration is stored in minutes.
 */
export class Appointment {
  constructor(public name: string, public description: string, public startTime: Date, public duration: number) {};
}
