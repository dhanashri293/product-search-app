// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  searchProducts(term: string): Observable<any[]> {
    // Mock implementation
    const products = [
      { "id": 1, "name": "Laptop Pro", "category": "Electronics", "price": 1200 },
      { "id": 2, "name": "T-shirt Red", "category": "Clothing", "price": 20 },
      { "id": 3, "name": "Gaming Mouse", "category": "Electronics", "price": 50 },
      { "id": 4, "name": "Running Shoes", "category": "Footwear", "price": 80 },
      { "id": 5, "name": "Jeans Blue", "category": "Clothing", "price": 40 }

    ];
    return of(products.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase())
    )); // Fixed missing parenthesis
  }
}