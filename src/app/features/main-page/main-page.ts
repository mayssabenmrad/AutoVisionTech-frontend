import { Component } from '@angular/core';
import { CarCrad } from '../../shared/components/car-crad/car-crad';

@Component({
  selector: 'app-main-page',
  imports: [CarCrad],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
