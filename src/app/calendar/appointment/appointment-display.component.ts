import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Appointment} from '../../data/appointment';
import {StorageService} from '../../data/storage.service';

@Component({
  selector: 'app-appointment-display',
  templateUrl: './appointment-display.component.html',
  styles: []
})
export class AppointmentDisplayComponent implements OnInit {
  @Input() selectedMonth: number;
  @Input() selectedYear: number;
  @Input() appointmentIndex: number;
  selectedAppointment: Appointment;

  private isConfirmDeleteVisible: boolean = false;
  private confirmDeleteMsg;

  constructor(private storage: StorageService, private router: Router) {}

  ngOnInit() {
    this.selectedAppointment = this.storage.getAppointment(this.appointmentIndex);
  }

  onCancel() {
    this.router.navigate(['/calendar/' + this.selectedYear + '/' + this.selectedMonth]);
  }

  onEdit() {
    this.router.navigate(['/calendar/' + this.selectedYear + '/' + this.selectedMonth + '/' + this.appointmentIndex + '/edit']);
  }

  onDelete() {
    this.confirmDeleteMsg = 'Are you sure you wish to delete the appointment "' +
      this.selectedAppointment.name + '"';
    this.isConfirmDeleteVisible = true;
  }

  confirmDelete() {
    this.isConfirmDeleteVisible = false;
    this.storage.deleteAppointment(this.selectedAppointment);
    this.router.navigate(['/calendar/' + this.selectedYear + '/' + this.selectedMonth]);
  }

  cancelDelete() {
    this.isConfirmDeleteVisible = false;
  }
}
