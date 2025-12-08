import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  // Observable to check if user is an admin
  isAdmin$: Observable<boolean>;
  // Observable to check if user is a client
  isAgent$: Observable<boolean>;
  // Observable to check if user is logged in
  isActive$: Observable<boolean>;

  mobileMenuOpen = false;
  currentPage = 'catalogue';
  
  currentUser: User | null = null;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.user$.pipe(
      map(user => user?.role === 'admin')
    );
    this.isAgent$ = this.authService.user$.pipe(
      map(user => user?.role === 'agent')
    );
    this.isActive$ = this.authService.user$.pipe(
      map(user => user?.isActive === true)
    );
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // Toggle Mobile Menu
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  async signOut(): Promise<void> {
    await this.authService.logout();
    this.currentPage = 'catalogue';
  }

  // Check Active Page
  isActivePage(page: string): boolean {
    return this.currentPage === page;
  }
}