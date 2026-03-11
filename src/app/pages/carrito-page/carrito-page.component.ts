import { Component, inject, OnInit } from '@angular/core';
import { ProductoCarrito } from '../../interfaces/producto-carrito.interface';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';
import { CarritoProductoComponent } from '../../components/carrito-producto/carrito-producto.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    CarritoProductoComponent,
  ],
  templateUrl: './carrito-page.component.html',
  styleUrl: './carrito-page.component.css'
})
export class CarritoPageComponent implements OnInit {

  productos: ProductoCarrito[] = [];
  total = 0;
  loading = true;
  loggedIn = true;

  carritoService = inject(CarritoService);
  authService = inject(AuthService);

  ngOnInit(): void {

    this.cargarCarrito();
  }

  cargarCarrito() {

    if(!this.authService.isLoggedIn()) {
      this.loggedIn = false;
      this.loading = false;
      return;
    }

    this.carritoService.obtenerCarrito().subscribe({

      next: (resp: any) => {

        this.productos = resp.detalles;
        this.total = resp.total;
        this.loading = false;
      },
      error: (err) => {

        console.error("Error cargando carrito", err);
        this.loading = false;
      }

    });
  }

  eliminarProducto(id: number) {

    this.carritoService.eliminarProducto(id).subscribe({

      next: () => {

        this.loading = true;
        this.cargarCarrito();
      },
      error: (err) => alert("Error eliminando producto" + err)

    });
  }

  aumentarCantidad(id: number) {

    this.carritoService.aumentarCantidad(id).subscribe({

      next: () => {

        this.loading = true;
        this.cargarCarrito();
      },

      error: (err) => alert("Error actualizando cantidad" + err)
    });
  }


  disminuirCantidad(id: number) {

    this.carritoService.disminuirCantidad(id).subscribe({

      next: () => {

        this.loading = true;
        this.cargarCarrito();
      },

      error: (err) => alert("Error actualizando cantidad" + err)
    })
  }


}
