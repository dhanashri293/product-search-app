// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  constructor(private http: HttpClient) { }

  searchProducts(term: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search=${term}`).pipe(
      map(response => response.products),
      catchError(error => {
        console.error('API Error:', error);
        return of([]);
      })
    );
  }
}