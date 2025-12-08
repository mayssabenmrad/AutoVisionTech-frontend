import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car, CreateReservationDto } from 'src/app/core/models';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-form.html',
  styleUrls: ['./reservation-form.css']
})
export class ReservationForm {
  @Input() car: Car | null = null;
  // Car status
  carStatus: 'available' | 'reserved' | 'sold' = 'available';
  
  // Show/hide the form
  showReservationForm = false;
  showMessage: boolean = false;
  message: { type: 'success' | 'error'; text: string } = { type: 'success', text: '' };
  isHiding = false;


  constructor(private reservationService: ReservationService) {}
  // Reservation form
  reservationForm: CreateReservationDto = {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    visitDate: '',
    visitTime: '',
    status: 'pending',
  };

  // Toggle the form
  toggleForm(): void {
    this.showReservationForm = !this.showReservationForm;
    if (!this.showReservationForm) {
      this.resetForm();
    }
  }

  // Submit the reservation
  onSubmit(): void {
    if(this.car && this.reservationForm){
        console.log(" Reservation data sent to API:", this.reservationForm);
       console.log("Car ID:", this.car.id);
      this.reservationService.createReservation(this.reservationForm, this.car.id)
      .subscribe({
        next: (response) => {
        this.message = { type: 'success', text: 'Reservation added successfully!' };
        this.showMessage = true;
        this.isHiding = false;

        setTimeout(() => {
          this.isHiding = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 500);
        }, 5000);
      },
      error: (error) => {
        this.message = { type: 'error', text: error.error?.message || 'Failed to add reservation' };
        this.showMessage = true;
        this.isHiding = false;

        setTimeout(() => {
          this.isHiding = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 500);
        }, 5000);
      },
    });

    }
  }

  // Cancel the reservation
  onCancel(): void {
    this.resetForm();
    this.showReservationForm = false;
  }

  // Check if the form is valid
  private isFormValid(): boolean {
    return !!(
      this.reservationForm.clientName.trim() &&
      this.reservationForm.clientEmail.trim() &&
      this.reservationForm.clientPhone.trim() &&
      this.reservationForm.visitDate &&
      this.reservationForm.visitTime
    );
  }

  // Reset the form
  private resetForm(): void {
    this.reservationForm = {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      visitDate: '',
      visitTime: '',
      status:'pending',
    };
  }

  // Minimum date (today)
  get minDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}