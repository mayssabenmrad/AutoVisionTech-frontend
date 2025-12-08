import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

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

  constructor(
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

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
    this.clearErrors();
    this.cdr.detectChanges(); // Force UI update

    try {
      const result = await this.authService.login(
        this.signInForm.email,
        this.signInForm.password
      );

      console.log("Login result:", result);

      // Vérifier si c'est un succès (a la propriété 'user')
      if (result && 'user' in result && result.user) {
        console.log('Login successful, navigating to profile');
        this.isLoading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/profile']);
        return;
      }
      
      // Si on arrive ici, c'est une erreur
      console.log("Login failed - showing error");
      
      this.errorMessage = 'Email or password incorrect';
      this.isLoading = false;
      
      // Force la détection de changement pour mettre à jour l'UI
      this.cdr.detectChanges();
      
      console.log("Error message set to:", this.errorMessage);
      console.log("isLoading set to:", this.isLoading);
      
      // Effacer le message après 5 secondes
      setTimeout(() => {
        this.clearErrors();
        this.cdr.detectChanges();
      }, 5000);

    } catch (error: any) {
      console.error('Login error (catch):', error);
      this.errorMessage = error?.message || 'An error occurred during login';
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  // Navigate to signup
  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  // Navigate to forgot password
  goToForgotPassword(): void {
    // this.router.navigate(['/forgot-password']);
  }

  // Clear error message when user starts typing
  clearErrors(): void {
    this.errorMessage = '';
  }
}