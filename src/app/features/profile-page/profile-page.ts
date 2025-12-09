import { Component, signal, SimpleChanges } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '@shared/components/hero/hero';
import { UpdateProfileDto, User } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

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
  protected isSaving = false;
  protected saveError = '';
  localUser!: User;

  protected formData = signal({
    name: '',
    email: '',
    image: null as File | null,
    imagePreview: '' as String | null
  });

  protected passwordForm = signal({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  protected deleteConfirmation = signal('');

  constructor(private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (!user) return;

      this.currentUser = user;
      this.localUser = { ...user };
      console.log('Parent received user:', user.id);
    });
  }
  
  protected startEditing(): void {
    this.isEditing.set(true);
    if(this.currentUser){
      this.formData.set({
      name: this.currentUser.name,
      email: this.currentUser.email,
      image: null,
      imagePreview: this.currentUser.image
    });
  }
}

  protected cancelEditing(): void {
    this.isEditing.set(false);
    if(this.currentUser){
      this.formData.set({
      name: this.currentUser.name,
      email: this.currentUser.email,
      image: null,
      imagePreview: this.currentUser.image
    });
  }
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
    const form = this.formData();

    if (!form.name.trim()) {
      alert('Name is required');
      return;
    }

    if (!form.email.trim() || !form.email.includes('@')) {
      alert('Valid email is required');
      return;
    }

    const data: UpdateProfileDto = {
      name: form.name,
      email: form.email
    };

    console.log("Saving profile with:", data);

    this.isSaving = true;
    this.userService.updateProfile(data).subscribe({
      next: () => {
        this.isSaving = false;
        this.isEditing.set(false);
        alert('Profile updated successfully!');
      },
      error: (err) => {
        this.isSaving = false;
        this.saveError = 'Failed to save changes';
        console.error(err);
      }
    });
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
