import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ConfirmarPedidoReq, ConfirmarPedidoRes, StripeIntentResponse } from '../interfaces/pago-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private getHeaders() {

    const token = localStorage.getItem('auth_token');

    return new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  crearIntentoDePago(cod_dir: number): Observable<StripeIntentResponse> {

    return this.http.post<StripeIntentResponse>(`${this.apiUrl}/stripe/intent`, { cod_dir }, { headers: this.getHeaders() });
  }

  finalizarPedido(datos: ConfirmarPedidoReq): Observable<ConfirmarPedidoRes> {

    return this.http.post<ConfirmarPedidoRes>(`${this.apiUrl}/stripe/finalizar`, datos, { headers: this.getHeaders() });
  }


}
