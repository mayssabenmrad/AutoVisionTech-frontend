import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '@shared/components/hero/hero';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'client';
  image: File | null;
  imagePreview: string;
  isActive: boolean;
  joinedDate: string;
}

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, Hero],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css']
})
export class ProfilePage {
  protected heroIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="brand-icon w-15 h-15" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
    `;

  protected readonly currentUser = signal<User>({
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@autovision.com',
    role: 'agent',
    image: null,
    imagePreview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    isActive: true,
    joinedDate: '2024-01-15'
  });

  protected isEditing = signal(false);
  protected showPasswordModal = signal(false);
  protected showDeleteModal = signal(false);

  // Form data
  protected formData = signal({
    name: this.currentUser().name,
    email: this.currentUser().email,
    image: null as File | null,
    imagePreview: this.currentUser().imagePreview
  });

  // Password form
  protected passwordForm = signal({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Delete confirmation
  protected deleteConfirmation = signal('');

  protected startEditing(): void {
    this.isEditing.set(true);
    this.formData.set({
      name: this.currentUser().name,
      email: this.currentUser().email,
      image: null,
      imagePreview: this.currentUser().imagePreview
    });
  }

  protected cancelEditing(): void {
    this.isEditing.set(false);
    this.formData.set({
      name: this.currentUser().name,
      email: this.currentUser().email,
      image: null,
      imagePreview: this.currentUser().imagePreview
    });
  }

  protected onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.formData.update(data => ({
          ...data,
          image: file,
          imagePreview: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  protected triggerImageUpload(): void {
    const input = document.getElementById('imageUpload') as HTMLInputElement;
    input?.click();
  }

  protected saveProfile(): void {
    const data = this.formData();
    
    if (!data.name.trim()) {
      alert('Name is required');
      return;
    }

    if (!data.email.trim() || !data.email.includes('@')) {
      alert('Valid email is required');
      return;
    }

    // Update user
    this.currentUser.update(user => ({
      ...user,
      name: data.name,
      email: data.email,
      image: data.image,
      imagePreview: data.imagePreview
    }));

    this.isEditing.set(false);
    console.log('Profile updated:', data);
    alert('Profile updated successfully!');
  }

  protected openPasswordModal(): void {
    this.showPasswordModal.set(true);
    this.passwordForm.set({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }

  protected closePasswordModal(): void {
    this.showPasswordModal.set(false);
  }

  protected changePassword(): void {
    const form = this.passwordForm();

    if (!form.currentPassword) {
      alert('Current password is required');
      return;
    }

    if (!form.newPassword || form.newPassword.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    console.log('Password changed successfully');
    this.closePasswordModal();
    alert('Password changed successfully!');
  }

  protected openDeleteModal(): void {
    this.showDeleteModal.set(true);
    this.deleteConfirmation.set('');
  }

  protected closeDeleteModal(): void {
    this.showDeleteModal.set(false);
  }

  protected deleteAccount(): void {
    if (this.deleteConfirmation() !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }

    console.log('Account deleted');
    alert('Account deleted successfully!');
    this.closeDeleteModal();
  }

  protected updateFormField(field: string, value: string): void {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  protected updatePasswordField(field: string, value: string): void {
    this.passwordForm.update(form => ({ ...form, [field]: value }));
  }

  protected getJoinedDate(): string {
    const date = new Date(this.currentUser().joinedDate);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}