import { Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car, CreateCarDto } from 'src/app/core/models';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-car.html',
  styleUrls: ['./add-car.css']
})
export class AddCar {
  @Output() carAdded = new EventEmitter<Car>();
  @Output() cancelled = new EventEmitter<void>();

  currentYearPlusOne = new Date().getFullYear() + 1;
  isLoading = false;
  errorMessage = '';

  newCarForm = {
    brand: '',
    model: '',
    description: '',
    year: new Date().getFullYear(),
    price: 0,
    kilometerAge: 0,
    condition: '',
    status: 'available' as 'available' | 'reserved' | 'sold',
    features: [] as string[]
  };

  // Feature management
  featureInput = '';
  
  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  imageError = '';
  MAX_IMAGES = 5;
  MAX_SIZE = 5 * 1024 * 1024; // 5MB

  constructor(
    private carService: CarService,
    private cdr: ChangeDetectorRef
  ) {}

  // Add a feature to the list
  addFeature(): void {
    const feature = this.featureInput.trim();
    if (feature && !this.newCarForm.features.includes(feature)) {
      this.newCarForm.features.push(feature);
      this.featureInput = '';
    }
  }

  // Remove a feature from the list
  removeFeature(index: number): void {
    this.newCarForm.features.splice(index, 1);
  }

  // Handle image selection
  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageError = '';

    if (!input.files || input.files.length === 0) return;

    const selectedFiles = Array.from(input.files);
    const remainingSlots = this.MAX_IMAGES - this.imageFiles.length;

    if (selectedFiles.length > remainingSlots) {
      this.imageError = `You can select up to ${this.MAX_IMAGES} images. There are ${remainingSlots} slot(s) available.`;
      input.value = '';
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    for (const file of selectedFiles) {
      if (file.size > this.MAX_SIZE) {
        invalidFiles.push(`${file.name} (too large)`);
        continue;
      }

      if (!file.type.startsWith('image/')) {
        invalidFiles.push(`${file.name} (not an image)`);
        continue;
      }

      validFiles.push(file);
    }

    if (invalidFiles.length > 0) {
      this.imageError = `Invalid files: ${invalidFiles.join(', ')}. Max size is 5MB.`;
    }

    validFiles.forEach(file => {
      this.imageFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.imagePreviews.push(e.target.result as string);
          this.cdr.detectChanges();
        }
      };
      reader.onerror = () => {
        console.error(`Error reading file ${file.name}`);
      };
      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  // Remove an image from the selection
  removeImage(index: number): void {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    this.imageError = '';
  }

  // Handle form submission
  async handleAddCar(): Promise<void> {
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill in all required fields correctly';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    const carData: CreateCarDto = {
      brand: this.newCarForm.brand.trim(),
      model: this.newCarForm.model.trim(),
      description: this.newCarForm.description.trim() || undefined,
      year: this.newCarForm.year,
      price: this.newCarForm.price,
      kilometerAge: this.newCarForm.kilometerAge,
      condition: this.newCarForm.condition.trim(),
      status: this.newCarForm.status,
      features: this.newCarForm.features.length > 0 ? this.newCarForm.features : undefined,
      images: this.imageFiles.length > 0 ? this.imageFiles : undefined
    };

    this.carService.createCar(carData).subscribe({
      next: (createdCar: Car) => {
        console.log('Car created successfully:', createdCar);
        this.carAdded.emit(createdCar);
        this.resetForm();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error creating car:', error);
        this.errorMessage = error?.error?.message || error?.message || 'Failed to add vehicle. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          this.errorMessage = '';
          this.cdr.detectChanges();
        }, 5000);
      }
    });
  }

  // Handle cancel action
  handleCancel(): void {
    this.resetForm();
    this.cancelled.emit();
  }

  // Validate form fields
  isFormValid(): boolean {
    return !!(
      this.newCarForm.brand.trim() &&
      this.newCarForm.model.trim() &&
      this.newCarForm.year > 1900 &&
      this.newCarForm.year <= this.currentYearPlusOne &&
      this.newCarForm.price > 0 &&
      this.newCarForm.kilometerAge >= 0 &&
      this.newCarForm.condition.trim()
    );
  }

  // Reset form to initial state
  resetForm(): void {
    this.newCarForm = {
      brand: '',
      model: '',
      description: '',
      year: new Date().getFullYear(),
      price: 0,
      kilometerAge: 0,
      condition: '',
      status: 'available',
      features: []
    };
    this.featureInput = '';
    this.imageFiles = [];
    this.imagePreviews = [];
    this.imageError = '';
    this.errorMessage = '';
  }
}