import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoCarrito } from '../../interfaces/producto-carrito.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-carrito-producto',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './carrito-producto.component.html',
  styleUrl: './carrito-producto.component.css'
})
export class CarritoProductoComponent {
  @Input() producto!: ProductoCarrito;

  @Output() eliminar = new EventEmitter<number>();
  @Output() aumentar = new EventEmitter<number>();
  @Output() disminuir = new EventEmitter<number>();

  onEliminar(): void {

    this.eliminar.emit(this.producto.cod_det_carr);
  }

  onAumentar(): void {

    this.aumentar.emit(this.producto.cod_det_carr);
  }

  onDisminuir(): void {

    this.disminuir.emit(this.producto.cod_det_carr);
  }

}
