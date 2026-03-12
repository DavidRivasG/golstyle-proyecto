import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class AuthService {
  // Injección de servicios
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Registrar usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Loguearse
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => this.handleAuth(res))
    );
  }

  // Cerrar sesión
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      })
    );
  }

  // Guardar el token en la base de datos
  private handleAuth(res: any) {
    if (res.access_token) {
      localStorage.setItem('auth_token', res.access_token);
      localStorage.setItem('user_data', JSON.stringify(res.usuario));
    }
  }

  // Comprobar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}