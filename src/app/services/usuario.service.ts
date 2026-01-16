import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) { }

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, { usuario });
  }


}
