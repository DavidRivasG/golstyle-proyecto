import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  // Injección de servicios
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // Obtener las ligas de la base de datos
  getLigas(): Observable<string[]> {

    return this.http.get<string[]>(`${this.apiUrl}/ligas`);
  }

  // Obtener los equipos de la base de datos
  getEquipos(): Observable<string[]> {

    return this.http.get<string[]>(`${this.apiUrl}/equipos`);
  }

  // Obtener las selecciones de la base de datos
  getSelecciones(): Observable<string[]> {

    return this.http.get<string[]>(`${this.apiUrl}/selecciones`);
  }

  // Obtener las temporadas de la base de datos
  getTemporadas(): Observable<string[]> {
    
    return this.http.get<string[]>(`${this.apiUrl}/temporadas`);
  }
}

