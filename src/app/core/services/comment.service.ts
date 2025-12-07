import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarComment, CreateCommentDto } from '../models';
import { BASE_URL } from '../../../lib/auth-client';


@Injectable({providedIn: 'root'})
export class CommentService{
  private apiUrl = `${BASE_URL}/comments`;

  constructor(private http: HttpClient) {}

  /**
   * Fetches a paginated list of comments for a specific product from the API.
   */
  getComments(
      carId: string
  ): Observable<CarComment[]>{
      return this.http.get<CarComment[]>(`${this.apiUrl}/car/${carId}`);
  }

  /**
   * Adds a new comment for a specific product.
   */
  addComment(commentData: CreateCommentDto): Observable<CarComment> {
    return this.http.post<CarComment>(
      `${this.apiUrl}`,
      commentData
    );
  }
}