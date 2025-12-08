import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCar } from '@shared/components/add-car/add-car';
import { Car, CarsResponse } from 'src/app/core/models';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-manage-cars',
  standalone: true,
  imports: [CommonModule, FormsModule, AddCar],
  templateUrl: './manage-cars.html',
  styleUrls: ['./manage-cars.css']
})
export class ManageCars implements OnInit {
  cars: Car[] = [];
  isLoading = false;
  errorMessage = '';

  // UI State
  showAddForm = false;
  editingCarId: string | null = null;
  editForm = {
    status: 'available' as 'available' | 'reserved' | 'sold',
    price: 0
  };

  constructor(
    private carService: CarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  // Load all cars
  async loadCars(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    this.carService.getCars().subscribe({
      next: (cars: CarsResponse) => {
        this.cars = cars.items || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading cars:', err);
        this.errorMessage = 'Failed to load vehicles. Please try again later.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

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
  async onCarAdded(car: Car): Promise<void> {
    this.showAddForm = false;
    alert(`Vehicle ${car.brand} ${car.model} has been added successfully with ${car.images.length} image(s)!`);
    
    // Reload cars to get the updated list
    await this.loadCars();
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
  async handleSaveEdit(carId: string): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges();

    this.carService.updateCar(carId, {
      status: this.editForm.status,
      price: this.editForm.price
    }).subscribe({
      next: (updatedCar: Car) => {
        const index = this.cars.findIndex(c => c.id === carId);
        if (index !== -1) {
          this.cars[index] = updatedCar;
        }
        this.isLoading = false;
        this.editingCarId = null;
        alert(`Vehicle ${updatedCar.brand} ${updatedCar.model} has been updated successfully!`);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating car:', err);
        alert('Failed to update vehicle. Please try again later.');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Handle cancel edit event
  handleCancelEdit(): void {
    this.editingCarId = null;
    this.editForm = { status: 'available', price: 0 };
  }

  // Handle delete car event
  async handleDeleteCar(carId: string): Promise<void> {
    const car = this.cars.find(c => c.id === carId);
    if (!car) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete ${car.brand} ${car.model}? This action cannot be undone.`
    );
    
    if (!confirmDelete) return;

    this.isLoading = true;
    this.cdr.detectChanges();

    this.carService.deleteCar(carId).subscribe({
      next: () => {
        this.cars = this.cars.filter(c => c.id !== carId);
        this.isLoading = false;
        alert('Vehicle deleted successfully!');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error deleting car:', err);
        alert('Failed to delete vehicle. Please try again later.');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
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