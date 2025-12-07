import { Car } from "./car.model";

export interface Reservation {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  visitDate: string;
  visitTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  carId: string;
  car?: Car;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationsResponse {
  items: Reservation[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: string | number;
    totalPages: number;
    currentPage: string | number;
  };
}

export interface CreateReservationDto {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  visitDate: string;
  visitTime: string;
  status?: string;
}

export interface UpdateReservationDto {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  visitDate?: string;
  visitTime?: string;
  status?: string;
}

export interface ReservationFilterDto {
    clientPhone?: string;
    minVisitDate?: string;
    maxVisitDate?: string;
    sortByVisitDate?: 'asc' | 'desc';
    status?: string;
    carId?: string;
}
