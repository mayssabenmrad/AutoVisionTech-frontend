import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '@shared/components/navbar/navbar';
import { Footer } from '@shared/components/footer/footer';
import { CarCrad } from './shared/components/car-crad/car-crad';
import { Hero } from '@shared/components/hero/hero';
import { MainPage } from './features/main-page/main-page';
import { CarDetails } from '@shared/components/car-details/car-details';
import { Comments } from '@shared/components/comments/comments';
import { CarFilter } from '@shared/components/car-filter/car-filter';
import { ReservationForm } from '@shared/components/reservation-form/reservation-form';
import { Signup } from './features/signup/signup';
import { Signin } from './features/signin/signin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CarCrad, Hero, MainPage, CarDetails, Comments, CarFilter, ReservationForm, Signup, Signin],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Navigation Handler
  navigateTo(page: string): void {
    console.log('Navigation vers:', page);
  }
}
