import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Direccion } from '../interfaces/direccion.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private apiUrl = `${environment.apiUrl}/direcciones`;
  private http = inject(HttpClient);

  obtener(): Observable<Direccion[]> {
    return this.http
      .get<{ direcciones: Direccion[] }>(this.apiUrl)
      .pipe(map(res => res.direcciones));
  }

  crear(direccion: Partial<Direccion>): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, direccion);
  }

  actualizar(id: number, direccion: Partial<Direccion>): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${id}`, direccion);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}
