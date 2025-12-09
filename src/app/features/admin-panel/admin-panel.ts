import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanel implements OnInit {
  // Users data
  users: User[] | null = null;
  // Edit state
  editingUser: string | null = null;
  editForm: Partial<User> = {};
  currentUserId: string | null = null;

  // Add user modal
  showAddModal = false;
  newUserForm = {
    name: '',
    email: '',
    password: '',
    role: 'agent' as 'admin' | 'agent',
    image: ''
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      // Load all users via the service
      this.userService.getAllUsers({}, 1, 100).subscribe({
        next: (response) => {
          // Exclude the current admin user from the list
          this.users = response.items.filter((user) => user.id !== this.currentUserId);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erreur lors du chargement des utilisateurs:', error);
        },
      });
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  }

  // Computed stats
  get totalUsers(): number {
    if(this.users){
      return this.users.length;
    }
    else{
      return 0;
    }
  }

  get activeUsers(): number {
    if(this.users){
      return this.users.filter(u => u.isActive).length;
    }
    else{
      return 0;
    }
  }

  get adminCount(): number {
    if(this.users){
      return this.users.filter(u => u.role === 'admin').length;
    }
    else{
      return 0;
    }
  }

  // Start editing a user
  handleStartEdit(user: User): void {
    this.editingUser = user.id;
    this.editForm = {
      role: user.role,
      isActive: user.isActive
    };
  }

  // Save edited user
  handleSaveEdit(user: User): void {
    //edit role
    if(this.editForm.role){
      this.userService.updateUserRole(user.id, this.editForm.role).subscribe({
        next: updated => {
          user.role = updated.role;
          this.cdr.detectChanges();
        },
        error: () => alert('Failed to update role')
      });

      //edit status
      this.userService.updateActivateUser(user.id, !user.isActive).subscribe({
        next: updated => {
          user.isActive = updated.isActive;
          this.cdr.detectChanges();
        },
        error: () => alert('Failed to update status')
      });
    }

    this.editingUser = null;
    this.editForm = {};
  }

  // Cancel editing
  handleCancelEdit(): void {
    this.editingUser = null;
    this.editForm = {};
  }

  // Toggle active status in edit mode
  toggleActiveStatus(): void {
    this.editForm.isActive = !this.editForm.isActive;
  }

  // Delete user
  handleDeleteUser(userId: string): void {
    if(this.users){
      const user = this.users.find(u => u.id === userId);
      if (!user) return;

      if (confirm(`Delete user ${user.name}?`)) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            if(this.users)
            this.users = this.users.filter(u => u.id !== userId);
            this.cdr.detectChanges();
          },
          error: () => alert("Failed to delete user")
        });
      }
    }
  }

  // Open add user modal
  openAddModal(): void {
    this.showAddModal = true;
  }

  // Close add user modal
  closeAddModal(): void {
    this.showAddModal = false;
    this.resetNewUserForm();
  }

  // Add new user
  handleAddUser(): void {
    if (!this.isNewUserFormValid()) return alert("Invalid data");
    this.authService.signUp(this.newUserForm).subscribe({
      next: (newUser) => {
        this.closeAddModal();
        alert(`User ${newUser.user.name} added successfully!`);
      },
      error: () => alert("Failed to add user")
    });
  }

  // Check if new user form is valid
  isNewUserFormValid(): boolean {
    return !!(
      this.newUserForm.name.trim() &&
      this.isValidEmail(this.newUserForm.email) &&
      this.newUserForm.password.trim().length >= 8
    );
  }

  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Reset new user form
  resetNewUserForm(): void {
    this.newUserForm = {
      name: '',
      email: '',
      password: '',
      role: 'agent',
      image: ''
    };
  }

  // Check if user is being edited
  isEditing(userId: string): boolean {
    return this.editingUser === userId;
  }

  // Get role badge class
  getRoleBadgeClass(role: string): string {
    return role === 'admin'
      ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50'
      : 'bg-blue-500/10 text-blue-400 border-blue-500/50';
  }

  // Get status badge class
  getStatusBadgeClass(isActive: boolean): string {
    return isActive
      ? 'bg-green-500/10 text-green-400 border-green-500/50'
      : 'bg-red-500/10 text-red-400 border-red-500/50';
  }
}