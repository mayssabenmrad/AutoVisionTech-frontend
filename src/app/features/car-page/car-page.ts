import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDetails } from '@shared/components/car-details/car-details';
import { Comments } from '@shared/components/comments/comments';
import { ReservationForm } from '@shared/components/reservation-form/reservation-form';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/core/services/car.service';
import { Car } from 'src/app/core/models';

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

  constructor(
    private route: ActivatedRoute,
    private carService: CarService
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
  

}