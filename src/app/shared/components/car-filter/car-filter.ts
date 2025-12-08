import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type SortByType = 'price-asc' | 'price-desc' | 'mileage-asc' | 'mileage-desc' | 'year-desc' | 'none';

export interface SearchFilters {
  searchText?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortByType;
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
export class CarFilter implements OnInit {
  @Output() filtersChange = new EventEmitter<SearchFilters>();

  searchText = '';
  minPrice: number = 0;
  maxPrice: number = 1000000;
  sortBy: SortByType = 'none';
  showFilters = false;

  sortOptions: SortOption[] = [
    { value: 'none', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'mileage-asc', label: 'Mileage: Low to High' },
    { value: 'mileage-desc', label: 'Mileage: High to Low' },
    { value: 'year-desc', label: 'Year: Newest First' }
  ];

  quickPriceFilters: PriceFilter[] = [
    { label: 'Under $20K', min: 0, max: 20000 },
    { label: '$20K - $40K', min: 20000, max: 40000 },
    { label: '$40K - $60K', min: 40000, max: 60000 },
    { label: 'Over $60K', min: 60000, max: 1000000 }
  ];

  ngOnInit(): void {
    this.emitFilters();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onSearchChange(): void { 
    this.emitFilters();
  }

  setQuickPriceFilter(min: number, max: number): void {
    this.minPrice = min;
    this.maxPrice = max;
  }

  resetFilters(): void {
    this.searchText = '';
    this.minPrice = 0;
    this.maxPrice = 1000000;
    this.sortBy = 'none';
    this.emitFilters();
  }

  emitFilters(): void {
    this.filtersChange.emit({
      searchText: this.searchText || undefined,
      minPrice: this.minPrice != null ? this.minPrice : undefined,
      maxPrice: this.maxPrice != null ? this.maxPrice : undefined,
      sortBy: this.sortBy !== 'none' ? this.sortBy : undefined
    });
  }
}
