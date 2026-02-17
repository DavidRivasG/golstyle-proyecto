import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductoCarrito } from '../interfaces/producto-carrito.interface';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private url = 'assets/data/carrito.json'

  constructor(private http: HttpClient ) { }

  getProductos(): Observable<ProductoCarrito[]> {
    return this.http.get<ProductoCarrito[]>(this.url);
  }

  actualizarProductos(productos: ProductoCarrito[]): Observable<ProductoCarrito[]> {
    return of(productos);
  }

}
