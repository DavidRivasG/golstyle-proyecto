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

  http = inject(HttpClient);

  private getHeaders() {

    const token = localStorage.getItem('auth_token');

    return new HttpHeaders({

      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  obtenerCarrito() {

    return this.http.get(`${this.apiUrl}/carritos/detalles`, {

      headers: this.getHeaders()
    });
  }

  addProduct(item: any) {

    return this.http.post(`${this.apiUrl}/carritos/agregar`, item, {

      headers: this.getHeaders()
    });
  }

  aumentarCantidad(id: number) {

    return this.http.patch(`${this.apiUrl}/carritos/aumentar/${id}` , {}, {

      headers: this.getHeaders()
    });
  }

  disminuirCantidad(id: number) {

    return this.http.patch(`${this.apiUrl}/carritos/disminuir/${id}` , {}, {

      headers: this.getHeaders()
    });
  }

  eliminarProducto(id: number) {

    return this.http.delete(`${this.apiUrl}/carritos/eliminar/${id}`, {

      headers: this.getHeaders()
    });

  }


}
