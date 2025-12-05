import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type SortByType = 'price-asc' | 'price-desc' | 'mileage-asc' | 'mileage-desc' | 'year-desc' | 'none';

export interface SearchFilters {
  searchText: string;
  priceRange: { min: number; max: number };
  sortBy: SortByType;
}

interface SortOption {
  value: SortByType;
  label: string;
}

interface PriceFilter {
  label: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-car-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-filter.html',
  styleUrls: ['./car-filter.css']
})
export class CarFilter {
  @Output() filtersChanged = new EventEmitter<SearchFilters>();

  searchText = '';
  minPrice = 0;
  maxPrice = 100000;
  sortBy: SortByType = 'none';
  showFilters = false;

  // Sort options
  sortOptions: SortOption[] = [
    { value: 'none', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'mileage-asc', label: 'Mileage: Low to High' },
    { value: 'mileage-desc', label: 'Mileage: High to Low' },
    { value: 'year-desc', label: 'Year: Newest First' }
  ];

  // Quick price filters
  quickPriceFilters: PriceFilter[] = [
    { label: 'Under $20K', min: 0, max: 20000 },
    { label: '$20K - $40K', min: 20000, max: 40000 },
    { label: '$40K - $60K', min: 40000, max: 60000 },
    { label: 'Over $60K', min: 60000, max: 100000 }
  ];

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onSearchChange(): void {
    this.emitFilters();
  }

  onPriceChange(): void {
    // Ensure minPrice ≤ maxPrice
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }

    // Ensure maxPrice ≥ minPrice
    if (this.maxPrice < this.minPrice) {
      this.maxPrice = this.minPrice;
    }

    this.emitFilters();
  }

  onSortChange(): void {
    this.emitFilters();
  }

  setQuickPriceFilter(min: number, max: number): void {
    this.minPrice = min;
    this.maxPrice = max;
    this.emitFilters();
  }

  resetFilters(): void {
    this.searchText = '';
    this.minPrice = 0;
    this.maxPrice = 100000;
    this.sortBy = 'none';
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChanged.emit({
      searchText: this.searchText,
      priceRange: { min: this.minPrice, max: this.maxPrice },
      sortBy: this.sortBy
    });
  }
}