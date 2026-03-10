import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getLigas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/ligas`);
  }

  getEquipos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/equipos`);
  }

  getSelecciones(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/selecciones`);
  }

  getTemporadas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/temporadas`);
  }
}

