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
  getCatalogo(filtros?: any, page?: number, perPage?: number): Observable<any> {

    let params = new HttpParams();

    if (page) {

      params = params.set('page', page.toString());
    }

    if (perPage) {

      params = params.set('per_page', perPage.toString());
    }

    if (filtros) {

      if (filtros.liga && filtros.liga.length > 0) {

        filtros.liga.forEach((l: string) => {

          params = params.append('liga[]', l);
        });
      }

      if (filtros.equipo && filtros.equipo.length > 0) {

        filtros.equipo.forEach((e: string) => {

          params = params.append('equipo[]', e);
        });
      }


      if (filtros.seleccion && filtros.seleccion.length > 0) {

        filtros.seleccion.forEach((s: string) => {

          params = params.append('seleccion[]', s);
        });
      }


      if (filtros.temporada && filtros.temporada.length > 0) {

        filtros.temporada.forEach((t: string) => {

          params = params.append('temporada[]', t);
        });
      }
    }

    return this.http.get(`${this.apiUrl}/camisetas/catalogo`, { params });
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
