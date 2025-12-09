import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
  
  // Show/hide the form
  showReservationForm = false;
  showMessage: boolean = false;
  message: { type: 'success' | 'error'; text: string } = { type: 'success', text: '' };
  isHiding = false;


  constructor(private reservationService: ReservationService, private cdr: ChangeDetectorRef) {}
  // Reservation form
  reservationForm: CreateReservationDto = {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    visitDate: '',
    visitTime: '',
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
    if (!this.car || !this.isFormValid()) return;

    this.reservationService
      .createReservation(this.reservationForm, this.car.id)
      .subscribe({
        next: () => {
          this.displayMessage('success', 'Reservation added successfully!');
          this.resetForm();
          this.showReservationForm = false; // hide form after submission
          this.cdr.detectChanges(); // Update UI
        },
        error: (error) => {
          this.displayMessage(
            'error',
            error.error?.message || 'Failed to add reservation'
          );
          this.cdr.detectChanges(); // Update UI
        },
      });
  }

  // Cancel the reservation
  onCancel(): void {
    this.resetForm();
    this.showReservationForm = false;
  }

  // Check if the form is valid
  isFormValid(): boolean {
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
    };
  }

  private displayMessage(type: 'success' | 'error', text: string) {
    this.message = { type, text };
    this.showMessage = true;
    this.isHiding = false;

    setTimeout(() => {
      this.isHiding = true;
      setTimeout(() => {
        this.showMessage = false;
        this.cdr.detectChanges(); // Update UI
      }, 500);
    }, 3000);
  }

  // Minimum date (today)
  get minDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}