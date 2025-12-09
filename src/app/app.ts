import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '@shared/components/navbar/navbar';
import { Footer } from '@shared/components/footer/footer';
import { Services } from './features/services/services';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, Services],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Navigation Handler
  navigateTo(page: string): void {
    console.log('Navigation vers:', page);
  }
}
