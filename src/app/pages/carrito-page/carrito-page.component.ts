import { Component } from '@angular/core';
import { ProductoCarrito } from '../../interfaces/producto-carrito.interface';
import { CarritoService } from '../../services/carrito.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CarritoProductoComponent } from '../../components/carrito-producto/carrito-producto.component';

@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [
    NgFor,
    CurrencyPipe,
    CarritoProductoComponent,
  ],
  templateUrl: './carrito-page.component.html',
  styleUrl: './carrito-page.component.css'
})
export class CarritoPageComponent {

  productos: ProductoCarrito[] = [];
  total = 0;

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carritoService.getProductos().subscribe(data => {
      this.productos = data;
      this.total = this.calcularTotal(data);
    });
  }

  calcularTotal(productos: ProductoCarrito[]): number {

    let total = 0;

    for ( let producto of productos ) {

      total += producto.precioUnitario * producto.cantidad;
    }

    return total;
  }


  eliminarProducto(id: number): void {

    // TERMINAR

  }

  actualizarCantidad(event: { id: number, accion: 'sumar' | 'restar' }): void {

    // TERMINAR

  }



}
