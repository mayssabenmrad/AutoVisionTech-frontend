import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Reservation,
  ReservationsResponse,
  CreateReservationDto,
  UpdateReservationDto,
  ReservationFilterDto,
} from '../models';

import { BASE_URL } from '../../../lib/auth-client';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = `${BASE_URL}/reservations`;

  constructor(private http: HttpClient) {}

  /**
   * Fetch paginated reservations with filters
   */
getReservations(
  page: number = 1,
  limit: number = 20,
  filters?: ReservationFilterDto
): Observable<ReservationsResponse> {

  let params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());

  if (filters) {
    if (filters.clientPhone) {
      params = params.set('clientPhone', filters.clientPhone);
    }

    if (filters.status) {
      params = params.set('status', filters.status);
    }

    if (filters.carId) {
      params = params.set('carId', filters.carId);
    }

    if (filters.minVisitDate) {
      params = params.set('minVisitDate', filters.minVisitDate);
    }

    if (filters.maxVisitDate) {
      params = params.set('maxVisitDate', filters.maxVisitDate);
    }

    if (filters.sortByVisitDate) {
      params = params.set('sortByVisitDate', filters.sortByVisitDate);
    }
  }

  return this.http.get<ReservationsResponse>(this.apiUrl, {
    params,
    withCredentials: true
  });
}

  /**
   * Get reservation by ID
   */
  getReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`,{ withCredentials: true });
  }

  /**
   * Create a reservation
   */
  createReservation(
    data: CreateReservationDto,
    carId: string
  ): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${this.apiUrl}/${carId}`,
      data,
      { withCredentials: true }
    );
  }

  /**
   * Update reservation
   */
  updateReservation(
    id: string,
    data: UpdateReservationDto
  ): Observable<Reservation> {
    return this.http.patch<Reservation>(
      `${this.apiUrl}/${id}`,
      data,
      { withCredentials: true }
    );
  }

  /**
   * Delete reservation
   */
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
