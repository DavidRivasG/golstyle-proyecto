import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importa HttpParams
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamisetasService {

  private apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getCatalogo(filtros: any): Observable<any> {

    return this.http.get(`${this.apiUrl}/camisetas/catalogo`, { params: filtros });
  }

  getDetails(id: number): Observable<any> {

    return this.http.get(`${this.apiUrl}/camisetas/${id}`);
  }


}
