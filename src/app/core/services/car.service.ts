import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Car, 
  CarFilters, 
  CarsResponse, 
  CreateCarDto, 
  UpdateCarDto 
} from '../models';
import { BASE_URL } from '../../../lib/auth-client';

@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = `${BASE_URL}/cars`;

  constructor(private http: HttpClient) {}

  /**
   * Fetch a paginated list of cars with filters (Public)
   */
  getCars(
    page: number = 1,
    limit: number = 20,
    filters?: CarFilters
  ): Observable<CarsResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters) {
      if (filters.brand) params = params.set('brand', filters.brand);
      if (filters.model) params = params.set('model', filters.model);

      if (filters.minYear != null) params = params.set('minYear', filters.minYear.toString());
      if (filters.maxYear != null) params = params.set('maxYear', filters.maxYear.toString());

      if (filters.minPrice != null) params = params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice != null) params = params.set('maxPrice', filters.maxPrice.toString());

      if (filters.minKilometerAge != null) params = params.set('minKilometerAge', filters.minKilometerAge.toString());
      if (filters.maxKilometerAge != null) params = params.set('maxKilometerAge', filters.maxKilometerAge.toString());

      if (filters.status) params = params.set('status', filters.status);

      if (filters.sortByPrice) params = params.set('sortByPrice', filters.sortByPrice);
      if (filters.sortByYear) params = params.set('sortByYear', filters.sortByYear);
      if (filters.sortByKilometerAge) params = params.set('sortByKilometerAge', filters.sortByKilometerAge);
    }
    return this.http.get<CarsResponse>(this.apiUrl, { params });
  }

  /**
   * Get a car by ID (Public)
   */
  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new car (Authenticated User)
   */
  createCar(data: CreateCarDto): Observable<Car> {
    const formData = new FormData();

    formData.append('brand', data.brand);
    formData.append('model', data.model);
    formData.append('year', data.year.toString());
    formData.append('price', data.price.toString());
    formData.append('kilometerAge', data.kilometerAge.toString());
    formData.append('status', data.status);
    formData.append('condition', data.condition);
    formData.append('description', data.description ?? '');

    // features[] (list of strings)
    if (data.features && data.features.length > 0) {
      data.features.forEach((f) => formData.append('features[]', f));
    }

    // images files
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => formData.append('images', file));
    }

    return this.http.post<Car>(this.apiUrl, formData, { withCredentials: true });
  }

  /**
   * Update a car by ID (Authenticated User)
   */
  updateCar(id: string, data: UpdateCarDto): Observable<Car> {
    const formData = new FormData();

    if (data.brand !== undefined) formData.append('brand', data.brand);
    if (data.model !== undefined) formData.append('model', data.model);
    if (data.year !== undefined) formData.append('year', data.year.toString());
    if (data.price !== undefined) formData.append('price', data.price.toString());
    if (data.kilometerAge !== undefined) formData.append('kilometerAge', data.kilometerAge.toString());
    if (data.status !== undefined) formData.append('status', data.status);
    if (data.condition !== undefined) formData.append('condition', data.condition);
    if (data.description !== undefined) formData.append('description', data.description);

    // features[] updated
    if (data.features !== undefined) {
      data.features.forEach((f) => formData.append('features[]', f));
    }

    // images to keep
    if (data.imagesToKeep !== undefined) {
      data.imagesToKeep.forEach((url) => formData.append('imagesToKeep[]', url));
    }

    // new images
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => formData.append('images', file));
    }

    return this.http.patch<Car>(`${this.apiUrl}/${id}`, formData, { withCredentials: true });
  }

  /**
   * Delete a car
   */
  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
