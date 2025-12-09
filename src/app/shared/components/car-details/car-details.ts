import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from 'src/app/core/models';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.html',
  styleUrls: ['./car-details.css']
})
export class CarDetails {
  @Input() car: Car | null= null;

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
    if(this.car){
    this.selectedImageIndex = 
      this.selectedImageIndex > 0 
        ? this.selectedImageIndex - 1 
        : this.car.images.length - 1;
    }

  }

  // Navigate to Next Image
  nextImage(): void {
    if(this.car){
    this.selectedImageIndex = 
      this.selectedImageIndex < this.car.images.length - 1 
        ? this.selectedImageIndex + 1 
        : 0;
    }
  }
}