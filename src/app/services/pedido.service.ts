import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pedido } from '../interfaces/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos`);
  }

  getPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/pedidos/${id}`);
  }

  crearPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedidos/crear`, pedido);
  }

  cancelarPedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pedidos/cancelar/${id}`);
  }
}