import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '@shared/components/navbar/navbar';
import { Footer } from '@shared/components/footer/footer';
import { CarCrad } from './shared/components/car-crad/car-crad';
import { Hero } from '@shared/components/hero/hero';
import { MainPage } from './features/main-page/main-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CarCrad, Hero, MainPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Navigation Handler
  navigateTo(page: string): void {
    console.log('Navigation vers:', page);
  }
}
