import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '@shared/components/navbar/navbar';
import { Footer } from '@shared/components/footer/footer';
import { CarCrad } from './features/car-crad/car-crad';
import { Hero } from '@shared/components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CarCrad, Hero],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Navigation Handler
  navigateTo(page: string): void {
    console.log('Navigation vers:', page);
  }
}