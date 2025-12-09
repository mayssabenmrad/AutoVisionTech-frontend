import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
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
  currentPage = 'catalog';
  
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.user$;
    this.isAdmin$ = this.authService.user$.pipe(
      map(user => user?.role == 'admin')
    );
    this.isAgent$ = this.authService.user$.pipe(
      map(user => user?.role == 'agent')
    );
    this.isActive$ = this.authService.user$.pipe(
      map(user => user?.isActive === true)
    );

    // Detect current page for active link highlighting
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('admin-panel')) this.currentPage = 'admin-panel';
        else if (url.includes('manage-cars')) this.currentPage = 'manage-cars';
        else if (url.includes('manage-reservations')) this.currentPage = 'manage-reservations';
        else if (url.includes('profile')) this.currentPage = 'profile-page';
        else if (url === '/') this.currentPage = 'catalog';
        else this.currentPage = '';
      }
    });
  }

  // Toggle Mobile Menu
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  async signOut(): Promise<void> {
    await this.authService.logout();
    this.currentPage = 'catalog';
  }

  // Check Active Page
  isActivePage(page: string): boolean {
    return this.currentPage === page;
  }
}