import { Component, inject, OnInit } from '@angular/core';
import { ProductoCarrito } from '../../interfaces/producto-carrito.interface';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CarritoProductoComponent } from '../../components/carrito-producto/carrito-producto.component';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    CarritoProductoComponent,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './carrito-page.component.html',
  styleUrl: './carrito-page.component.css'
})
export class CarritoPageComponent implements OnInit {

  productos: ProductoCarrito[] = [];
  total = 0;
  loading = true;
  loggedIn = true;
  procesandoId: number | null = null;
  mensajeCarrito: { texto: string; tipo: 'error' | 'exito' } | null = null;

  carritoService = inject(CarritoService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.cargarCarrito();
  }

  private mostrarMensaje(texto: string, tipo: 'error' | 'exito') {
    this.mensajeCarrito = { texto, tipo };
    setTimeout(() => this.mensajeCarrito = null, 4000);
  }

  cargarCarrito() {

    if (!this.authService.isLoggedIn()) {
      this.loggedIn = false;
      this.loading = false;
      return;
    }

    this.carritoService.obtenerCarrito().subscribe({
      next: (resp: any) => {
        this.productos = resp.detalles;
        this.total = resp.total;
        this.loading = false;
        this.procesandoId = null;
        const totalCantidad = this.productos.reduce((sum, p) => sum + p.cantidad, 0);
        this.carritoService.totalItems.set(totalCantidad);
      },
      error: () => {
        this.loading = false;
        this.procesandoId = null;
      }
    });
  }

  eliminarProducto(id: number) {
    this.procesandoId = id;
    this.carritoService.eliminarProducto(id).subscribe({
      next: () => this.cargarCarrito(),
      error: () => {
        this.mostrarMensaje('Error al eliminar el producto. Inténtalo de nuevo.', 'error');
        this.procesandoId = null;
      }
    });
  }

  aumentarCantidad(id: number) {
    this.procesandoId = id;
    this.carritoService.aumentarCantidad(id).subscribe({
      next: () => this.cargarCarrito(),
      error: () => {
        this.mostrarMensaje('Error al actualizar la cantidad. Inténtalo de nuevo.', 'error');
        this.procesandoId = null;
      }
    });
  }

  disminuirCantidad(id: number) {
    this.procesandoId = id;
    this.carritoService.disminuirCantidad(id).subscribe({
      next: () => this.cargarCarrito(),
      error: () => {
        this.mostrarMensaje('Error al actualizar la cantidad. Inténtalo de nuevo.', 'error');
        this.procesandoId = null;
      }
    });
  }
}
