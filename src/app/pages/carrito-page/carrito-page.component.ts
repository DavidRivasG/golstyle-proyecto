import { Component, inject, OnInit } from '@angular/core';
import { ProductoCarrito } from '../../interfaces/producto-carrito.interface';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';
import { CarritoProductoComponent } from '../../components/carrito-producto/carrito-producto.component';
import { AuthService } from '../../services/auth.service';
import { DireccionService } from '../../services/direccion.service';
import { PedidoService } from '../../services/pedido.service';
import { Direccion } from '../../interfaces/direccion.interface';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    CarritoProductoComponent,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './carrito-page.component.html',
  styleUrl: './carrito-page.component.css'
})
export class CarritoPageComponent implements OnInit {

  productos: ProductoCarrito[] = [];
  total = 0;
  loading = true;
  loggedIn = true;
  direcciones: Direccion[] = [];
  direccionSeleccionada: number | null = null;
  mostrarModalPedido = false;
  cargandoDirecciones = false;
  creandoPedido = false;

  // Injección de servicios
  carritoService = inject(CarritoService);
  authService = inject(AuthService);
  direccionService = inject(DireccionService);
  pedidoService = inject(PedidoService);
  router = inject(Router);


  ngOnInit(): void {

    this.cargarCarrito();
  }

  // Función para cargar la información del carrito
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

  // Función para eliminar un elemento del carrito
  eliminarProducto(id: number) {

    this.carritoService.eliminarProducto(id).subscribe({

      next: () => {

        this.loading = true;
        this.cargarCarrito();
      },
      error: (err) => alert("Error eliminando producto" + err)

    });
  }

  // Función para aumentar la cantidad de un producto del carrito a +1
  aumentarCantidad(id: number) {

    this.carritoService.aumentarCantidad(id).subscribe({

      next: () => {

        this.loading = true;
        this.cargarCarrito();
      },

      error: (err) => alert("Error actualizando cantidad" + err)
    });
  }


  // Función para disminuir la cantidad de un producto del carrito a -1
  disminuirCantidad(id: number) {

    this.carritoService.disminuirCantidad(id).subscribe({

      next: () => {

        this.loading = true;
        this.cargarCarrito();
      },

      error: (err) => alert("Error actualizando cantidad" + err)
    })
  }

  // Mostrar la ventana de selección de dirección
  abrirModalPedido() {

    this.mostrarModalPedido = true;
    this.cargarDirecciones();
  }

  // Cerrar la ventana de selección de dirección
  cerrarModalPedido() {

    this.mostrarModalPedido = false;
    this.direccionSeleccionada = null;
  }

  // Cargar las direcciones del usuario
  cargarDirecciones() {

    this.cargandoDirecciones = true;
    this.direccionService.obtener().subscribe({
      next: (dirs) => {

        this.direcciones = dirs;
        this.cargandoDirecciones = false;
      },
      error: (err) => {

        console.error("Error cargando direcciones", err);
        this.cargandoDirecciones = false;
        alert("Error al cargar las direcciones");
      }
    });
  }

  // Creación del pedido
  crearPedido() {

    if (!this.direccionSeleccionada) {
      alert("Por favor selecciona una dirección");
      return;
    }

    this.creandoPedido = true;
    const pedidoData = {

      cod_dir: this.direccionSeleccionada,
      estado: 'pendiente'
    };

    this.pedidoService.crearPedido(pedidoData).subscribe({

      next: (resp: any) => {
        
        this.creandoPedido = false;
        this.cerrarModalPedido();
        alert("Pedido creado exitosamente");
        this.loading = true;
        this.cargarCarrito();
        this.router.navigate(['/mis-pedidos']);
      },
      error: (err) => {
        this.creandoPedido = false;
        console.error("Error creando pedido", err);
        alert("Error al crear el pedido: " + (err.error?.message || err.message));
      }
    });
  }


}
