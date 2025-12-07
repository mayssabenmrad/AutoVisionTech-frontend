import { Component } from '@angular/core';
import { CarCrad } from '../../shared/components/car-crad/car-crad';
import { CarFilter } from '@shared/components/car-filter/car-filter';
import { Hero } from "@shared/components/hero/hero";

@Component({
  selector: 'app-main-page',
  imports: [CarCrad, CarFilter, Hero],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
