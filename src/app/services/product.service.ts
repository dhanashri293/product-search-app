import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  searchProducts(searchTerm: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?search=${searchTerm}`);
  }
}