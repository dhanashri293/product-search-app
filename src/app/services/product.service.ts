// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })  // <-- This is crucial
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; // Update with your actual API endpoint

  constructor(private http: HttpClient) {}

  searchProducts(searchTerm: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?search=${searchTerm}`).pipe(
    catchError(() => of({ products: [] })) // Handle errors gracefully;
    );
  }
}