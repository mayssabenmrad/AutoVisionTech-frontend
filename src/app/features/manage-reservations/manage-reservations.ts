import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Reservation {
  id: string;
  carId: string;
  clientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
}

@Component({
  selector: 'app-manage-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-reservations.html',
  styleUrls: ['./manage-reservations.css']
})
export class ManageReservations {
  // data
  reservations: Reservation[] = [
    {
      id: '1',
      carId: '1',
      clientName: 'Ahmed Ben Ali',
      email: 'ahmed@example.com',
      phone: '+216 55 123 456',
      date: '2024-12-15',
      time: '10:00',
      status: 'pending',
      createdAt: new Date('2024-12-01')
    },
    {
      id: '2',
      carId: '2',
      clientName: 'Fatma Mansour',
      email: 'fatma@example.com',
      phone: '+216 22 987 654',
      date: '2024-12-16',
      time: '14:00',
      status: 'confirmed',
      createdAt: new Date('2024-12-02')
    },
    {
      id: '3',
      carId: '3',
      clientName: 'Mohamed Trabelsi',
      email: 'mohamed@example.com',
      phone: '+216 98 456 789',
      date: '2024-12-14',
      time: '11:30',
      status: 'cancelled',
      createdAt: new Date('2024-12-03')
    },
    {
      id: '4',
      carId: '1',
      clientName: 'Leila Hamdi',
      email: 'leila@example.com',
      phone: '+216 50 321 654',
      date: '2024-12-17',
      time: '09:00',
      status: 'pending',
      createdAt: new Date('2024-12-04')
    },
    {
      id: '5',
      carId: '4',
      clientName: 'Karim Saidi',
      email: 'karim@example.com',
      phone: '+216 29 654 321',
      date: '2024-12-18',
      time: '15:30',
      status: 'confirmed',
      createdAt: new Date('2024-12-05')
    }
  ];

  cars: Car[] = [
    {
      id: '1',
      brand: 'BMW',
      model: 'M4',
      year: 2021,
      price: 65000,
      images: ['https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg']
    },
    {
      id: '2',
      brand: 'Mercedes-Benz',
      model: 'AMG GT',
      year: 2022,
      price: 120000,
      images: ['https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg']
    },
    {
      id: '3',
      brand: 'Audi',
      model: 'RS6',
      year: 2020,
      price: 95000,
      images: ['https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg']
    },
    {
      id: '4',
      brand: 'Porsche',
      model: '911 Turbo',
      year: 2023,
      price: 180000,
      images: ['https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg']
    }
  ];

  // Filters
  filterStatus: string = 'all';
  filterDate: string = '';

  // Computed properties
  get filteredReservations(): Reservation[] {
    return this.reservations.filter(reservation => {
      const matchesStatus = this.filterStatus === 'all' || reservation.status === this.filterStatus;
      const matchesDate = !this.filterDate || reservation.date === this.filterDate;
      return matchesStatus && matchesDate;
    });
  }

  get totalReservations(): number {
    return this.reservations.length;
  }

  get pendingReservations(): number {
    return this.reservations.filter(r => r.status === 'pending').length;
  }

  get confirmedReservations(): number {
    return this.reservations.filter(r => r.status === 'confirmed').length;
  }

  get cancelledReservations(): number {
    return this.reservations.filter(r => r.status === 'cancelled').length;
  }

  // Get car info by ID
  getCarInfo(carId: string): Car | undefined {
    return this.cars.find(car => car.id === carId);
  }

  // Update reservation status
  updateReservationStatus(reservationId: string, status: 'pending' | 'confirmed' | 'cancelled'): void {
    const reservation = this.reservations.find(r => r.id === reservationId);
    if (reservation) {
      reservation.status = status;
    }
  }

  // Get status badge class
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-400 border-green-500/50';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/50';
      default:
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50';
    }
  }

  // Get status icon
  getStatusIcon(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'cancelled':
        return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
      default:
        return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
}