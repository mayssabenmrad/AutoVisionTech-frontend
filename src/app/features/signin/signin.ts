import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
  showPassword = false;
  isLoading = false;
  
  signInForm: SignInFormData = {
    email: '',
    password: '',
    rememberMe: false
  };

  // Error messages
  errorMessage = '';
  emailError = '';
  passwordError = '';

  constructor(private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Email validation
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate email on blur
  validateEmail(): void {
    if (this.signInForm.email && !this.isValidEmail(this.signInForm.email)) {
      this.emailError = 'Please enter a valid email address';
    } else {
      this.emailError = '';
    }
  }

  // Validate password on blur
  validatePassword(): void {
    if (this.signInForm.password && this.signInForm.password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters';
    } else {
      this.passwordError = '';
    }
  }

  // Check if form is valid
  isFormValid(): boolean {
    return !!(
      this.signInForm.email.trim() &&
      this.isValidEmail(this.signInForm.email) &&
      this.signInForm.password.trim() &&
      this.signInForm.password.length >= 8 &&
      !this.emailError &&
      !this.passwordError
    );
  }

  // Submit form
  async onSubmit(): Promise<void> {
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Sign in attempt:', {
        email: this.signInForm.email,
        password: '***',
        rememberMe: this.signInForm.rememberMe
      });

      // Here you would typically call an authentication service
      // const response = await this.authService.signIn(this.signInForm);
      
      // Simulate successful login
      alert(`Welcome back! Logging in as ${this.signInForm.email}`);
      
      // Navigate to dashboard or home
      // this.router.navigate(['/dashboard']);
      
    } catch (error) {
      this.errorMessage = 'Invalid email or password. Please try again.';
      console.error('Sign in error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Navigate to signup
  goToSignup(): void {
    console.log('Navigate to signup');
    // this.router.navigate(['/signup']);
  }

  // Navigate to forgot password
  goToForgotPassword(): void {
    console.log('Navigate to forgot password');
    // this.router.navigate(['/forgot-password']);
  }

  // Clear error message when user starts typing
  clearErrors(): void {
    this.errorMessage = '';
  }
}