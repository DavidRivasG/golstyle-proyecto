import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importa HttpParams
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamisetasService {

  private apiUrl = environment.apiUrl;
  // Injección de servicios
  http = inject(HttpClient);

  // Obtener catálogo
  getCatalogo(): Observable<any> {

    return this.http.get(`${this.apiUrl}/camisetas/catalogo`);
  }

  // Obtener los detalles de una camiseta
  getDetails(id: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/camisetas/${id}`);
  }

  // Obtener 3 camisetas destacadas para la home
  getDestacadas(): Observable<any> {

    return this.http.get(`${this.apiUrl}/camisetas/destacadas`);
  }

  // Subir imagen adicional (admin)
  subirImagen(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', file);
    return this.http.post(`${this.apiUrl}/camisetas/${id}/imagenes`, formData);
  }

  // Eliminar imagen adicional (admin)
  eliminarImagen(imgId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/camisetas/imagenes/${imgId}`);
  }


}
