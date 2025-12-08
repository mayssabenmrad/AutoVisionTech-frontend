import { Component, OnInit } from '@angular/core';
import { CarCrad } from '../../shared/components/car-crad/car-crad';
import { CarFilter } from '@shared/components/car-filter/car-filter';
import { Hero } from "@shared/components/hero/hero";
import { Car, CarsResponse } from 'src/app/core/models';
import { CarService } from 'src/app/core/services/car.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [CarCrad, CarFilter, Hero, CommonModule],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
  standalone: true,
})
export class MainPage implements OnInit {
  cars: Car[] = [];
  loading = true;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.loading = true;

    this.carService.getCars(1, 20).subscribe({
      next: (res: CarsResponse) => {
        console.log("Cars loaded:", res);
        this.cars = res.items;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading cars:", err);
        this.loading = false;
      }
    });
  }
}


