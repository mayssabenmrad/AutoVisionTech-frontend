import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  isActive: boolean;
  image?: string;
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanel {
  // Users data
  users: User[] = [
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@autovision.com',
      role: 'admin',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@autovision.com',
      role: 'agent',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      id: '3',
      name: 'Pierre Dubois',
      email: 'pierre.dubois@autovision.com',
      role: 'agent',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
    },
    {
      id: '4',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@autovision.com',
      role: 'agent',
      isActive: false,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    {
      id: '5',
      name: 'Luc Moreau',
      email: 'luc.moreau@autovision.com',
      role: 'admin',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ];

  // Edit state
  editingUser: string | null = null;
  editForm: Partial<User> = {};

  // Add user modal
  showAddModal = false;
  newUserForm = {
    name: '',
    email: '',
    password: '',
    role: 'agent' as 'admin' | 'agent',
    image: ''
  };

  // Computed stats
  get totalUsers(): number {
    return this.users.length;
  }

  get activeUsers(): number {
    return this.users.filter(u => u.isActive).length;
  }

  get adminCount(): number {
    return this.users.filter(u => u.role === 'admin').length;
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
  handleSaveEdit(userId: string): void {
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...this.editForm
      };
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
    const user = this.users.find(u => u.id === userId);
    if (user && confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.users = this.users.filter(u => u.id !== userId);
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
    if (this.isNewUserFormValid()) {
      const newUser: User = {
        id: Date.now().toString(),
        name: this.newUserForm.name,
        email: this.newUserForm.email,
        role: this.newUserForm.role,
        isActive: true,
        image: this.newUserForm.image || undefined
      };
      
      this.users.unshift(newUser);
      this.closeAddModal();
      alert(`User ${newUser.name} has been added successfully!`);
    }
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