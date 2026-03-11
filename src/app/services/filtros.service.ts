import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  private apiUrl = environment.apiUrl;

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

