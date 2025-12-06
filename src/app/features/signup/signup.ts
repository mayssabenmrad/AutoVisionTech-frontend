import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'agent';
  agreeToTerms: boolean;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  showPassword = false;
  showConfirmPassword = false;
  
  signupForm: SignupFormData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    agreeToTerms: false
  };

  constructor(private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Form validation
  isFormValid(): boolean {
    return !!(
      this.signupForm.fullName.trim() &&
      this.signupForm.email.trim() &&
      this.isValidEmail(this.signupForm.email) &&
      this.signupForm.password.length >= 8 &&
      this.signupForm.password === this.signupForm.confirmPassword &&
      this.signupForm.agreeToTerms
    );
  }

  // Email validation
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Check if passwords match
  passwordsMatch(): boolean {
    return this.signupForm.password === this.signupForm.confirmPassword;
  }

  // Submit form
  onSubmit(): void {
    if (this.isFormValid()) {
      console.log('Signup form submitted:', {
        ...this.signupForm,
        password: '***',
        confirmPassword: '***'
      });
      
      // Here you would typically call an authentication service
      alert(`Welcome ${this.signupForm.fullName}! Your account has been created.`);
      
      // Navigate to login or dashboard
      // this.router.navigate(['/login']);
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  // Navigate to login
  goToLogin(): void {
    console.log('Navigate to login');
    // this.router.navigate(['/login']);
  }
}