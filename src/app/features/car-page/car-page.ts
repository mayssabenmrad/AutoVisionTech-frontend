import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDetails } from '@shared/components/car-details/car-details';
import { Comments } from '@shared/components/comments/comments';
import { ReservationForm } from '@shared/components/reservation-form/reservation-form';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/core/services/car.service';
import { Car, CreateReservationDto } from 'src/app/core/models';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-car-page',
  standalone: true,
  imports: [CommonModule, CarDetails, Comments, ReservationForm],
  templateUrl: './car-page.html',
  styleUrls: ['./car-page.css']
})
export class CarPage {
  car: Car | null = null;
  carId: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showAlert: boolean = false;
  reservationData: CreateReservationDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.carId = params.get('id') || '';
      if (this.carId) {
        this.loadCarData();
      }
    });
  }

  //load car data using car service
  loadCarData() {
    this.carService
      .getCarById(this.carId) 
      .subscribe((data) => {
        this.car = data;
      });
  }

  //after adding a comment
  // After a comment is added
  onCommentAdded() {
    // Reload only the product to get updated comments
    this.carService
      .getCarById(this.carId)
      .subscribe((updatedCar) => {
        if (this.car) {
          this.car.comments = updatedCar.comments;
          this.car.totalComments = updatedCar.totalComments;
        }
      });
  }
  //to display alert messages
  showStyledAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}