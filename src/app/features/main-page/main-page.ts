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

  heroIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="brand-icon w-15 h-15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <path d="M9 17h6"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
    `;

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

