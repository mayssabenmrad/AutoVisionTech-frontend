import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
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

  // Navigation Handler
  navigateTo(page: string): void {
    this.currentPage = page;
    this.mobileMenuOpen = false;
    console.log('Navigating to:', page);
  }

  // Sign Out Handler
  signOut(): void {
    console.log('Signing out...');
    this.mobileMenuOpen = false;
  }

  // Check Active Page
  isActivePage(page: string): boolean {
    return this.currentPage === page;
  }
}