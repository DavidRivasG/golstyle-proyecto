import { Component, inject, OnInit } from '@angular/core';
import { CamisetasService } from '../../services/camisetas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detalle-camiseta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './detalle-camiseta.component.html',
  styleUrl: './detalle-camiseta.component.css'
})
export class DetalleCamisetaComponent implements OnInit {

  camiseta: any = null;
  loading = true;

  tallaSeleccionada: number | null = null; 
  cantidad = 1;


  nombrePersonalizado: string | null = null;
  dorsalPersonalizado: number | null = null;

  // Injección de servicio
  private camisetasService = inject(CamisetasService);
  private carritoService = inject(CarritoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!id) {

      this.router.navigate(['/catalogo']);
      return;
    }

    this.camisetasService.getDetails(id).subscribe({
      next: (resp) => {

        this.camiseta = resp;
        this.loading = false;
      },
      error: (err) => {

        console.error("Error cargando camiseta:", err);
        this.router.navigate(['/catalogo']);
      }
    });
  }

  // Obtener el stock de una variante de la camiseta
  getStockVariante(): number {

    if (!this.camiseta || !this.tallaSeleccionada) return 0;

    const variante = this.camiseta.variantes.find(

      (v: any) => v.cod_var == this.tallaSeleccionada
    );

    return variante ? variante.stock : 0;
  }


  // Comprobar la cantidad del formulario
  validarCantidad() {

    const max = this.getStockVariante();
    
    if (max === 0) {

      this.cantidad = 0;
      return;
    }

    if (this.cantidad < 1 && max > 0) this.cantidad = 1;
    if (this.cantidad > max) this.cantidad = max;
  }


  // Validar el dorsal del formulario
  validarDorsal() {
    if (this.dorsalPersonalizado !== null) {

      if (this.dorsalPersonalizado > 99) this.dorsalPersonalizado = 99;
      if (this.dorsalPersonalizado < 0) this.dorsalPersonalizado = 0;
    }
  }

  // Agregar camiseta al carrito
  agregarAlCarrito() {


    if (!this.authService.isLoggedIn()) {

      alert("Debes iniciar sesión para comprar");
      this.router.navigate(['/login']);
      return;
    }

    if (!this.tallaSeleccionada) {

      alert("Por favor, selecciona una talla");
      return;
    }

    const stockDisponible = this.getStockVariante();

    if (stockDisponible <= 0) {

      alert("Lo sentimos, esta talla está agotada.");
      return;
    }

    this.validarDorsal();

    const newCamiseta = {

      cod_var: Number(this.tallaSeleccionada),
      cantidad: this.cantidad,
      nombre_personalizado: this.nombrePersonalizado?.trim() || null,
      dorsal_personalizado: this.dorsalPersonalizado ?? null
    };

    this.carritoService.addProduct(newCamiseta).subscribe({

      next: () => {

        alert("Camiseta añadida al carrito");
      },
      error: (err) => {

        this.handleError(err);
      }
    });
  }

  // Manejo de errores
  private handleError(err: any) {

    if (err.status === 401) {

      alert("Tu sesión ha expirado. Por favor, vuelve a entrar.");
      this.router.navigate(['/login']);
      return;
    }
    
    if (err.status === 400 && err.error?.stock !== undefined) {

      alert(`Stock insuficiente. Solo quedan ${err.error.stock} unidades.`);
      this.cantidad = err.error.stock;
      return;
    } else {

      alert("No se pudo añadir el producto. Inténtalo de nuevo.");
      return;
    }
  }
}