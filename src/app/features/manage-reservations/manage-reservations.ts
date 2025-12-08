import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationFilter, ReservationFilters } from '@shared/components/reservation-filter/reservation-filter';
import { Reservation, ReservationFilterDto } from 'src/app/core/models';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-manage-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule, ReservationFilter],
  templateUrl: './manage-reservations.html',
  styleUrls: ['./manage-reservations.css']
})
export class ManageReservations implements OnInit {
  // State
  reservations: Reservation[] = [];
  isLoading = false;
  error: string | null = null;

  // Pagination
  currentPage = 1;
  pageSize = 1;
  totalItems = 0;
  totalPages = 0;

  // Filters
  currentFilters: ReservationFilters = {
    status: 'all',
    date: '',
    searchText: ''
  };

  constructor(private reservationService: ReservationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  // Load reservations from API
  loadReservations(): void {
    this.isLoading = true;
    this.error = null;

    const filters = this.buildApiFilters();

    this.reservationService
      .getReservations(this.currentPage, this.pageSize, filters)
      .subscribe({
        next: (response) => {
          this.reservations = response.items;
          this.totalItems = response.meta.totalItems;
          this.totalPages = response.meta.totalPages;
          this.currentPage = response.meta.currentPage;
          this.isLoading = false;
          this.cdr.detectChanges(); // Force UI update
        },
        error: (err) => {
          console.log("xxxxxxxxxxxxx");
          console.error('Error loading reservations:', err);
          this.error = 'Erreur lors du chargement des réservations';
          this.isLoading = false;
          this.cdr.detectChanges(); // Force UI update
        }
      });
  }

  // Build API filter object from UI filters
  buildApiFilters(): ReservationFilterDto | undefined {
    const filters: ReservationFilterDto = {};

    // Status filter
    if (this.currentFilters.status && this.currentFilters.status !== 'all') {
      filters.status = this.currentFilters.status;
    }

    // Date filter
    if (this.currentFilters.date) {
      filters.minVisitDate = this.currentFilters.date;
      filters.maxVisitDate = this.currentFilters.date;
    }

    // Search text filter (using phone number)
    if (this.currentFilters.searchText) {
      filters.clientPhone = this.currentFilters.searchText;
    }

    // Sort by date
    filters.sortByVisitDate = 'desc';

    return Object.keys(filters).length > 0 ? filters : undefined;
  }

  // Handle filter changes
  onFiltersChanged(filters: ReservationFilters): void {
    this.currentFilters = filters;
    this.currentPage = 1; // Reset to first page
    this.loadReservations();
  }

  // Pagination methods
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadReservations();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadReservations();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadReservations();
    }
  }

  // Computed properties
  get filteredReservations(): Reservation[] {
    return this.reservations;
  }

  get totalReservations(): number {
    return this.totalItems;
  }

  get pendingReservations(): number {
    return this.reservations.filter(r => r.status === 'pending').length;
  }

  get confirmedReservations(): number {
    return this.reservations.filter(r => r.status === 'confirmed').length;
  }

  get cancelledReservations(): number {
    return this.reservations.filter(r => r.status === 'cancelled').length;
  }

  // Update reservation status
  updateReservationStatus(
    reservationId: string,
    status: 'pending' | 'confirmed' | 'cancelled'
  ): void {
    this.reservationService
      .updateReservation(reservationId, { status })
      .subscribe({
        next: (updatedReservation) => {
          // Update local state
          const index = this.reservations.findIndex(r => r.id === reservationId);
          if (index !== -1) {
            this.reservations[index] = updatedReservation;
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error updating reservation:', err);
          this.error = 'Erreur lors de la mise à jour de la réservation';
        }
      });
  }

  // Delete reservation
  deleteReservation(reservationId: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      return;
    }

    this.reservationService.deleteReservation(reservationId).subscribe({
      next: () => {
        // Remove from local state
        this.reservations = this.reservations.filter(r => r.id !== reservationId);
        this.totalItems--;
        
        // Reload if page is empty
        if (this.reservations.length === 0 && this.currentPage > 1) {
          this.currentPage--;
          this.loadReservations();
        }
      },
      error: (err) => {
        console.error('Error deleting reservation:', err);
        this.error = 'Erreur lors de la suppression de la réservation';
      }
    });
  }

  // Get car info from reservation
  getCarInfo(reservation: Reservation) {
    return reservation.car;
  }

  // Get status badge class
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-400 border-green-500/50';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/50';
      default:
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50';
    }
  }

  // Get status icon
  getStatusIcon(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'cancelled':
        return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
      default:
        return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }

  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Retry loading on error
  retry(): void {
    this.loadReservations();
  }
}