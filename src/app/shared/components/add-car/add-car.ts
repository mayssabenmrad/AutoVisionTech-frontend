import { Component, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from 'src/app/core/models';

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

  newCarForm = {
    brand: '',
    model: '',
    description: '',
    year: new Date().getFullYear(),
    price: 0,
    kilometerAge: 0,
    condition: '',
    status: 'available' as 'available' | 'reserved' | 'sold'
  };

  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  imageError = '';
  MAX_IMAGES = 5;
  MAX_SIZE = 1 * 1024 * 1024; // 1MB

  constructor(private cdr: ChangeDetectorRef) {}

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
        invalidFiles.push(file.name);
        continue;
      }

      if (!file.type.startsWith('image/')) {
        invalidFiles.push(file.name);
        continue;
      }

      validFiles.push(file);
    }

    if (invalidFiles.length > 0) {
      this.imageError = `The following files are invalid (size > 1MB or unsupported format): ${invalidFiles.join(', ')}`;
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
  handleAddCar(): void {
    if (this.isFormValid()) {
      const carImages = this.imagePreviews.length > 0 
        ? this.imagePreviews 
        : ['https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg'];
      
      // const newCar: Car = {
      //   id: Date.now().toString(),
      //   brand: this.newCarForm.brand,
      //   model: this.newCarForm.model,
      //   description: this.newCarForm.description,
      //   year: this.newCarForm.year,
      //   price: this.newCarForm.price,
      //   kilometerAge: this.newCarForm.kilometerAge,
      //   condition: this.newCarForm.condition,
      //   status: this.newCarForm.status,
      //   images: carImages
      // };
      
      // this.carAdded.emit(newCar);
      this.resetForm();
    }
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
      this.newCarForm.description.trim() &&
      this.newCarForm.year > 0 &&
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
      status: 'available'
    };
    this.imageFiles = [];
    this.imagePreviews = [];
    this.imageError = '';
  }
}