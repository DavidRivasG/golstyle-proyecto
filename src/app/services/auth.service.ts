import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, credentials).pipe(
      tap((res: any) => this.handleAuth(res))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/`, {}).pipe(
      tap(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      })
    );
  }

  private handleAuth(res: any) {
    if (res.access_token) {
      localStorage.setItem('auth_token', res.access_token);
      localStorage.setItem('user_data', JSON.stringify(res.usuario));
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}