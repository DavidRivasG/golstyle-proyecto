import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductoCarrito } from '../interfaces/producto-carrito.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = environment.apiUrl;

  // Injección de servicios
  http = inject(HttpClient);

  // Configuración de headers
  private getHeaders() {

    const token = localStorage.getItem('auth_token');

    return new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtener el carrito del usuario
  obtenerCarrito() {

    return this.http.get(`${this.apiUrl}/carritos/detalles`, {

      headers: this.getHeaders()
    });
  }

  // Añadir un producto al carrito
  addProduct(item: any) {

    return this.http.post(`${this.apiUrl}/carritos/agregar`, item, {

      headers: this.getHeaders()
    });
  }

  // Aumentar la cantiad de un producto +1
  aumentarCantidad(id: number) {

    return this.http.patch(`${this.apiUrl}/carritos/aumentar/${id}` , {}, {

      headers: this.getHeaders()
    });
  }

  // Disminuir la cantidad de un producto a -1
  disminuirCantidad(id: number) {

    return this.http.patch(`${this.apiUrl}/carritos/disminuir/${id}` , {}, {

      headers: this.getHeaders()
    });
  }

  // Eliminar un producto del carrito del usuario
  eliminarProducto(id: number) {

    return this.http.delete(`${this.apiUrl}/carritos/eliminar/${id}`, {

      headers: this.getHeaders()
    });

  }


}
