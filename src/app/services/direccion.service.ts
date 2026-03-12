import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Direccion } from '../interfaces/direccion.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  // Injección de servicios
  private apiUrl = `${environment.apiUrl}/direcciones`;
  private http = inject(HttpClient);

  // Ontener las direcciones de un usuario
  obtener(): Observable<Direccion[]> {
    return this.http
      .get<{ direcciones: Direccion[] }>(this.apiUrl)
      .pipe(map(res => res.direcciones));
  }

  // Crear una nueva dirección para el usuario
  crear(direccion: Partial<Direccion>): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, direccion);
  }

  // Actualizar una dirección del usuario
  actualizar(id: number, direccion: Partial<Direccion>): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${id}`, direccion);
  }

  // Eliminar una dirección del usuario
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}
