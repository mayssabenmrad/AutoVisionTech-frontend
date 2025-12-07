import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDetails } from '@shared/components/car-details/car-details';
import { Comments } from '@shared/components/comments/comments';
import { ReservationForm } from '@shared/components/reservation-form/reservation-form';

@Component({
  selector: 'app-car-page',
  standalone: true,
  imports: [CommonModule, CarDetails, Comments, ReservationForm],
  templateUrl: './car-page.html',
  styleUrls: ['./car-page.css']
})
export class CarPage {
}