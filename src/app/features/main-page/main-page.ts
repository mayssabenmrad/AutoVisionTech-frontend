import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarCrad } from '../../shared/components/car-crad/car-crad';
import { CarFilter, SearchFilters, SortByType } from '@shared/components/car-filter/car-filter';
import { Hero } from "@shared/components/hero/hero";
import { Car, CarsResponse, CarFilters } from 'src/app/core/models';
import { CarService } from 'src/app/core/services/car.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CarCrad, CarFilter, Hero, CommonModule, FormsModule],
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css']
})
export class MainPage implements OnInit {
  cars: Car[] = [];
  loading = true;

  constructor(private carService: CarService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCars();
  }

  //retrieve cars and apply filters
  loadCars(filters?: CarFilters) {
    this.loading = true;
    this.carService.getCars(1, 100, filters).subscribe({
      next: (res: CarsResponse) => {
        this.cars = [...res.items];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading cars:', err);
        this.loading = false;
      }
    });
  }

  //filtering by price, brand, kilometerAge and year
  onFiltersChanged(filters: SearchFilters) {
    const apiFilters: CarFilters = {};

    if (filters.minPrice != null) apiFilters.minPrice = filters.minPrice;
    if (filters.maxPrice != null) apiFilters.maxPrice = filters.maxPrice;

    switch (filters.sortBy) {
      case 'price-asc': apiFilters.sortByPrice = 'asc'; break;
      case 'price-desc': apiFilters.sortByPrice = 'desc'; break;
      case 'year-desc': apiFilters.sortByYear = 'desc'; break;
      case 'mileage-asc': apiFilters.sortByKilometerAge = 'asc'; break;
      case 'mileage-desc': apiFilters.sortByKilometerAge = 'desc'; break;
    }

    if (filters.searchText) {
      apiFilters.brand = filters.searchText;
    }

    this.loadCars(apiFilters);
  }
}

