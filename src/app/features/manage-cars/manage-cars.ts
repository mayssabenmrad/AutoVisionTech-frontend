import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCar } from '@shared/components/add-car/add-car';

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
  selector: 'app-manage-cars',
  standalone: true,
  imports: [CommonModule, FormsModule, AddCar],
  templateUrl: './manage-cars.html',
  styleUrls: ['./manage-cars.css']
})
export class ManageCars {
  cars: Car[] = [
    {
      id: '1',
      brand: 'BMW',
      model: 'M4',
      year: 2021,
      price: 65000,
      kilometerAge: 29500,
      condition: 'Excellent',
      status: 'available',
      description: 'A high-performance coupe with an aggressive design.',
      images: ['https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg']
    },
    {
      id: '2',
      brand: 'Mercedes-Benz',
      model: 'AMG GT',
      year: 2022,
      price: 120000,
      kilometerAge: 15000,
      condition: 'Excellent',
      status: 'available',
      description: 'Luxury sports car with exceptional performance.',
      images: ['https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg']
    },
    {
      id: '3',
      brand: 'Audi',
      model: 'RS6',
      year: 2020,
      price: 95000,
      kilometerAge: 42000,
      condition: 'Good',
      status: 'reserved',
      description: 'High-performance wagon with plenty of space.',
      images: ['https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg']
    },
    {
      id: '4',
      brand: 'Porsche',
      model: '911 Turbo',
      year: 2023,
      price: 180000,
      kilometerAge: 5000,
      condition: 'Excellent',
      status: 'sold',
      description: 'Iconic sports car with timeless design.',
      images: ['https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg']
    }
  ];

  // UI State
  showAddForm = false;
  editingCarId: string | null = null;
  editForm = {
    status: 'available' as 'available' | 'reserved' | 'sold',
    price: 0
  };

  get totalCars(): number {
    return this.cars.length;
  }

  get availableCars(): number {
    return this.cars.filter(c => c.status === 'available').length;
  }

  get reservedCars(): number {
    return this.cars.filter(c => c.status === 'reserved').length;
  }

  get soldCars(): number {
    return this.cars.filter(c => c.status === 'sold').length;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  // Handle car added event
  onCarAdded(car: Car): void {
    this.cars.unshift(car);
    this.showAddForm = false;
    alert(`Vehicle ${car.brand} ${car.model} has been added successfully with ${car.images.length} image(s)!`);
  }

  // Handle add cancelled event
  onAddCancelled(): void {
    this.showAddForm = false;
  }

  // Handle start edit event
  handleStartEdit(car: Car): void {
    this.editingCarId = car.id;
    this.editForm = {
      status: car.status,
      price: car.price
    };
  }

  // Handle save edit event
  handleSaveEdit(carId: string): void {
    const carIndex = this.cars.findIndex(c => c.id === carId);
    if (carIndex !== -1) {
      this.cars[carIndex] = {
        ...this.cars[carIndex],
        ...this.editForm
      };
    }
    this.editingCarId = null;
    this.editForm = { status: 'available', price: 0 };
  }

  // Handle cancel edit event
  handleCancelEdit(): void {
    this.editingCarId = null;
    this.editForm = { status: 'available', price: 0 };
  }

  // Handle delete car event
  handleDeleteCar(carId: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this vehicle? This action cannot be undone.');
    if (confirmDelete) {
      this.cars = this.cars.filter(c => c.id !== carId);
    }
  }

  // Check if a car is currently being edited
  isEditing(carId: string): boolean {
    return this.editingCarId === carId;
  }

  // Get CSS classes based on car status
  getStatusColor(status: string): string {
    switch (status) {
      case 'available':
        return 'bg-green-500/10 text-green-400 border-green-500/50';
      case 'reserved':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50';
      case 'sold':
        return 'bg-red-500/10 text-red-400 border-red-500/50';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/50';
    }
  }
}