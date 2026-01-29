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
  @Output() cambiarCantidad = new EventEmitter<{ id: number, accion: 'sumar' | 'restar' }>;

  onEliminar(): void {
    this.eliminar.emit(this.producto.id);
  }

  onSumar(): void {
    this.cambiarCantidad.emit({ id: this.producto.id, accion: 'sumar' });
  }

  onRestar(): void {
    this.cambiarCantidad.emit({ id: this.producto.id, accion: 'restar' });
  }

}
