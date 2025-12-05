import { Component } from '@angular/core';
import { CarCrad } from '../../shared/components/car-crad/car-crad';
import { CarFilter } from '@shared/components/car-filter/car-filter';

@Component({
  selector: 'app-main-page',
  imports: [CarCrad, CarFilter],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
