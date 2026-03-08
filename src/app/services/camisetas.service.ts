import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camiseta } from '../interfaces/camiseta';

@Injectable({
  providedIn: 'root'
})
export class CamisetasService {

  private apiUrl = 'http://localhost:8000/api/camisetas';

  constructor(private http: HttpClient) {}

  getCatalogo(params: any = {}): Observable<{ data: Camiseta[] }> {
    
    return this.http.get<{ data: Camiseta[] }>(`${this.apiUrl}/catalogo`, { params });
  }
}
