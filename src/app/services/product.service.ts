import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string; // Ej: "Real Madrid 25/26"
  image: string; // La URL de la foto (Ej: "assets/real-madrid.jpg" o desde tu backend)
  price?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Ajusta esta URL a tu API real (según tu docker-compose, podría ser localhost:8080 o localhost:3000)
  private apiUrl = 'http://localhost:3000/api/productos'; 

  constructor(private http: HttpClient) { }

  getBestSellers(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}