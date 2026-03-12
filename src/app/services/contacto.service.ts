import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactoService {

    // Injección de servicios
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    // Enviar el mensaje al back
    enviarMensaje(data: any): Observable<any> {

        return this.http.post(`${this.apiUrl}/contacto/enviar`, data);
    }

}
