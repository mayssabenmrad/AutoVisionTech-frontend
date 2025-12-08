import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'agent';
  agreeToTerms: boolean;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  signUpError = '';

  signupForm: SignupFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    agreeToTerms: false
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') this.showPassword = !this.showPassword;
    else this.showConfirmPassword = !this.showConfirmPassword;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  passwordsMatch(): boolean {
    return this.signupForm.password === this.signupForm.confirmPassword;
  }

  isFormValid(): boolean {
    return !!(
      this.signupForm.name.trim() &&
      this.signupForm.email.trim() &&
      this.isValidEmail(this.signupForm.email) &&
      this.signupForm.password.length >= 8 &&
      this.passwordsMatch() &&
      this.signupForm.agreeToTerms
    );
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.signUpError = 'Please fill in all required fields correctly.';
      return;
    }

    this.isSubmitting = true;
    this.signUpError = '';

    this.authService.signUp(this.signupForm).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);

        // Reload session
        this.authService.getSession().subscribe({
          next: () => {
            this.isSubmitting = false;
            this.router.navigate(['/profile']);
          },
          error: (err) => {
            console.error('Failed to load session:', err);
            this.isSubmitting = false;
            this.router.navigate(['/profile']);
          }
        });
      },
      error: (err) => {
        console.error('Signup failed:', err);
        this.signUpError = err.error?.message || 'Failed to create account.';
        this.isSubmitting = false;
        setTimeout(() => (this.signUpError = ''), 5000);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/signin']);
  }
}
