import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../interfaces/pedido.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  // Injección de servicios
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Obtener los pedidos de un usuario
  getPedidos(): Observable<Pedido[]> {
    
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos`);
  }

  // Obtener la información de un pedido de un usuario
  getPedido(id: number): Observable<Pedido> {

    return this.http.get<Pedido>(`${this.apiUrl}/pedidos/${id}`);
  }

  // Crear un nuevo pedido
  crearPedido(pedido: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/pedidos/crear`, pedido);
  }

  // Cancelar un pedido de un usuario
  cancelarPedido(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/pedidos/cancelar/${id}`);
  }
}