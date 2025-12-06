import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  mobileMenuOpen = false;
  currentPage = 'catalogue';
  
  currentUser = {
    name: 'Jean Dupont',
    role: 'agent',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  };

  // Toggle Mobile Menu
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  signOut(): void {
    // Sign out logic here
  }

  // Check Active Page
  isActivePage(page: string): boolean {
    return this.currentPage === page;
  }
}