import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactoService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    enviarMensaje(data: any): Observable<any> {

        return this.http.post(`${this.apiUrl}/contacto/enviar`, data);
    }

}
