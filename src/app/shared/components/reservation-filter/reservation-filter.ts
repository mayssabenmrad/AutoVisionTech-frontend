import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ReservationFilters {
  status: string;
  date: string;
  searchText: string;
}

@Component({
  selector: 'app-reservation-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-filter.html',
  styleUrls: ['./reservation-filter.css']
})
export class ReservationFilter {
  @Output() filtersChanged = new EventEmitter<ReservationFilters>();

  filterStatus = 'all';
  filterDate = '';
  searchText = '';

  onFilterChange(): void {
    this.emitFilters();
  }

  onSearchChange(): void {
    this.emitFilters();
  }

  clearSearch(): void {
    this.searchText = '';
    this.emitFilters();
  }

  resetFilters(): void {
    this.filterStatus = 'all';
    this.filterDate = '';
    this.searchText = '';
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChanged.emit({
      status: this.filterStatus,
      date: this.filterDate,
      searchText: this.searchText
    });
  }
}