import { Component, signal } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '@shared/components/hero/hero';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';

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

  currentUser: User | null = null;

  protected isEditing = signal(false);
  protected showPasswordModal = signal(false);
  protected showDeleteModal = signal(false);

  // -----------------------------
  // SAFE INITIAL STATE (NO CRASH)
  // -----------------------------
  protected formData = signal({
    name: '',
    email: '',
    image: null as File | null,
    imagePreview: ''
  });

  protected passwordForm = signal({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  protected deleteConfirmation = signal('');

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (!user) return;

      this.currentUser = user;

      console.log('Parent received user:', user.id);
    });
  }

  protected startEditing(): void {

  }

  protected cancelEditing(): void {
  }

  protected onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

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
    alert('Password changed successfully!');
    this.closePasswordModal();
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
    if (!this.currentUser) return '';
    return new Date(this.currentUser.createdAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
