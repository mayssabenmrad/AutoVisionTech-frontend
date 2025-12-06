import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  kilometerAge: number;
  condition: string;
  status: 'available' | 'reserved' | 'sold';
  description: string;
  images: string[];
}

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.html',
  styleUrls: ['./car-details.css']
})
export class CarDetails {
  // Specific car data
  car: Car = {
    id: '1',
    brand: 'BMW',
    model: 'M4',
    year: 2021,
    price: 65000,
    kilometerAge: 29500,
    condition: 'Excellent',
    status: 'available',
    description: 'A high-performance coupe with an aggressive design and great handling. Features include premium leather interior, advanced safety systems, and cutting-edge technology.',
    images: [
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg',
      'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg',
      'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg'
    ]
  };

  selectedImageIndex = 0;

  getStatusColor(status: string): string {
    switch (status) {
      case 'available':
        return 'available-badge';
      case 'reserved':
        return 'reserved-badge';
      case 'sold':
        return 'sold-badge';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/50';
    }
  }

  // Image Selection
  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  // Navigate to Previous Image
  previousImage(): void {
    this.selectedImageIndex = 
      this.selectedImageIndex > 0 
        ? this.selectedImageIndex - 1 
        : this.car.images.length - 1;
  }

  // Navigate to Next Image
  nextImage(): void {
    this.selectedImageIndex = 
      this.selectedImageIndex < this.car.images.length - 1 
        ? this.selectedImageIndex + 1 
        : 0;
  }
}