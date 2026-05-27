import { ResenaCardComponent } from './../../components/resena-card/resena-card.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CamisetasService } from '../../services/camisetas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Resena, ResenaCrear } from '../../interfaces/Resena';
import { ResenaService } from '../../services/resena.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-camiseta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ResenaCardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './detalle-camiseta.component.html',
  styleUrl: './detalle-camiseta.component.css'
})
export class DetalleCamisetaComponent implements OnInit {

  camiseta: any = null;
  loading = true;
  cargando = false;
  cargandoEnvioResena = false;
  mensaje: { texto: string; tipo: 'error' | 'exito' } | null = null;

  tallaSeleccionada: number | null = null;
  cantidad = 1;

  galeria = signal<{ url: string; cod_img: number | null }[]>([]);
  imagenActiva = signal<string>('');
  imagenIndex = signal<number>(0);


  nombrePersonalizado: string | null = null;
  dorsalPersonalizado: any = null;

  resenas = signal<Resena[]>([]);
  cargandoResenas = signal<boolean>(false);
  eliminandoResena = signal<number | null>(null);
  confirmarEliminar = signal<number | null>(null);

  mostrarModal = signal<boolean>(false);
  resenaEditando = signal<Resena | null>(null);
  nuevaPuntuacion = signal<number>(1);
  nuevoComentario = signal<string>('');
  mensajeResena = signal<{ texto: string; tipo: 'error' | 'exito' } | null>(null);
  errorResenaModal = signal<string | null>(null);
  exitoResena = signal<{ titulo: string; subtitulo: string } | null>(null);
  exitoCarrito = signal<{ titulo: string; subtitulo: string } | null>(null);

  // Injección de servicio
  private camisetasService = inject(CamisetasService);
  private carritoService = inject(CarritoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private resenaService = inject(ResenaService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {

      this.router.navigate(['/catalogo']);
      return;
    }

    this.camisetasService.getDetails(id).subscribe({
      next: (resp) => {

        this.camiseta = resp;
        const extras = (resp.imagenes ?? []).map((img: any) => ({ url: img.imagen, cod_img: img.cod_img }));
        const galeria = [{ url: resp.imagen_principal, cod_img: null }, ...extras].filter(item => item.url);
        this.galeria.set(galeria);
        this.imagenActiva.set(galeria[0]?.url ?? '');
        this.imagenIndex.set(0);
        this.loading = false;
      },
      error: (err) => {

        console.error("Error cargando camiseta:", err);
        this.router.navigate(['/catalogo']);
      }
    });

    this.cargarResenas(id);
  }

  private cargarResenas(idCamiseta: number) {

    this.cargandoResenas.set(true);

    this.resenaService.getResenas(idCamiseta).subscribe({
      next: (data: any) => {

        this.resenas.set(data);
        this.cargandoResenas.set(false);
      },
      error: () => {

        this.cargandoResenas.set(false);
      }
    });
  }

  seleccionarImagen(index: number) {
    this.imagenIndex.set(index);
    this.imagenActiva.set(this.galeria()[index].url);
  }

  anterior() {
    const idx = (this.imagenIndex() - 1 + this.galeria().length) % this.galeria().length;
    this.seleccionarImagen(idx);
  }

  siguiente() {
    const idx = (this.imagenIndex() + 1) % this.galeria().length;
    this.seleccionarImagen(idx);
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
  }


  // Validar el dorsal del formulario
  validarDorsal() {
  }

  // Comprobar si el dorsal es un número entero válido entre 0 y 99
  esDorsalValido(): boolean {
    if (this.dorsalPersonalizado === null || this.dorsalPersonalizado === undefined || String(this.dorsalPersonalizado).trim() === '') {
      return true; // Es opcional
    }
    const val = String(this.dorsalPersonalizado).trim();
    const esNumero = /^\d+$/.test(val);
    if (!esNumero) {
      return false;
    }
    const num = Number(val);
    return num >= 0 && num <= 99;
  }

  // Agregar camiseta al carrito
  agregarAlCarrito() {

    this.cargando = true;

    if (!this.authService.isLoggedIn()) {

      this.router.navigate(['/login']);
      return;
    }

    if (!this.tallaSeleccionada) {

      this.mostrarMensaje('Por favor, selecciona una talla antes de continuar.', 'error');
      this.cargando = false;
      return;
    }

    const stockDisponible = this.getStockVariante();

    if (stockDisponible <= 0) {

      this.mostrarMensaje('Lo sentimos, esta talla está agotada.', 'error');
      this.cargando = false;
      return;
    }

    if (this.cantidad > stockDisponible) {
      this.mostrarMensaje('La cantidad seleccionada supera el stock disponible.', 'error');
      this.cargando = false;
      return;
    }

    if (!this.esDorsalValido()) {
      this.mostrarMensaje('El dorsal debe ser un número válido entre 0 y 99.', 'error');
      this.cargando = false;
      return;
    }

    this.validarDorsal();

    const newCamiseta = {

      cod_var: Number(this.tallaSeleccionada),
      cantidad: this.cantidad,
      nombre_personalizado: this.nombrePersonalizado?.trim() || null,
      dorsal_personalizado: this.dorsalPersonalizado && String(this.dorsalPersonalizado).trim() !== '' ? Number(this.dorsalPersonalizado) : null
    };

    this.carritoService.addProduct(newCamiseta).subscribe({

      next: () => {

        this.cargando = false;
        this.carritoService.totalItems.update(n => n + this.cantidad);
        this.exitoCarrito.set({ titulo: '¡Añadida al Carrito!', subtitulo: 'Tu camiseta ha sido añadida correctamente.' });
      },
      error: (err) => {

        this.cargando = false;
        this.handleError(err);
      }
    });
  }

  private mostrarMensaje(texto: string, tipo: 'error' | 'exito') {
    this.mensaje = { texto, tipo };
    setTimeout(() => this.mensaje = null, 4000);
  }

  private mostrarMensajeResena(texto: string, tipo: 'error' | 'exito') {
    if (tipo === 'error') {
      this.errorResenaModal.set(texto);
    } else {
      this.mensajeResena.set({ texto, tipo });
      setTimeout(() => this.mensajeResena.set(null), 4000);
    }
  }

  // Manejo de errores
  private handleError(err: any) {

    if (err.status === 401) {

      this.mostrarMensaje('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.', 'error');
      this.router.navigate(['/login']);
      return;
    }

    if (err.status === 400 && err.error?.stock !== undefined) {

      this.mostrarMensaje(`Stock insuficiente. Solo quedan ${err.error.stock} unidades disponibles.`, 'error');
      this.cantidad = err.error.stock;
      return;
    }

    this.mostrarMensaje('No se pudo añadir el producto. Inténtalo de nuevo.', 'error');
  }

  resenaForm = this.fb.group({
    puntuacion: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comentario: ['', Validators.required]
  });



  abrirModalResena(resena?: Resena) {

    if (!this.authService.isLoggedIn()) {

      this.router.navigate(['/login']);
      return;
    }

    if (resena) {

      this.resenaEditando.set(resena);
      this.resenaForm.patchValue({

        comentario: resena.comentario,
        puntuacion: resena.puntuacion
      });
    } else {

      this.resenaEditando.set(null);
      this.resenaForm.reset({ puntuacion: 5, comentario: '' });
    }

    this.mostrarModal.set(true);
  }

  cerrarModal() {

    this.mostrarModal.set(false);
    this.resenaEditando.set(null);
  }


  guardarResena() {

    if (this.resenaForm.invalid || this.cargandoEnvioResena) return;

    this.cargandoEnvioResena = true;
    const datos = this.resenaForm.value;

    if (this.resenaEditando()) {

      this.resenaService.editarResena(this.resenaEditando()!.cod_res, datos as ResenaCrear).subscribe({

        next: () => {

          this.cargandoEnvioResena = false;
          this.cerrarModal();
          this.cargarResenas(this.camiseta.cod_cam);
          this.exitoResena.set({ titulo: '¡Reseña Actualizada!', subtitulo: 'Tu opinión ha sido modificada correctamente.' });
        },
        error: () => {

          this.cargandoEnvioResena = false;
          this.mostrarMensajeResena('Error al actualizar la reseña. Inténtalo de nuevo.', 'error');
        }
      });

    } else {

      this.resenaService.crearResena(this.camiseta.cod_cam, datos as ResenaCrear).subscribe({

        next: () => {

          this.cargandoEnvioResena = false;
          this.cerrarModal();
          this.cargarResenas(this.camiseta.cod_cam);
          this.exitoResena.set({ titulo: '¡Reseña Publicada!', subtitulo: 'Gracias por compartir tu opinión.' });
        },
        error: (err) => {

          this.cargandoEnvioResena = false;
          this.mostrarMensajeResena(err.error?.message || 'Error al crear la reseña. Inténtalo de nuevo.', 'error');
        }
      });
    }

  }

  reaccionar(idResena: number, tipo: 'like' | 'dislike') {

    if (!this.authService.isLoggedIn()) {

      this.router.navigate(['/login']);
      return;
    }

    this.resenaService.reaccionarResena(idResena, tipo).subscribe({

      next: () => {

        this.cargarResenas(this.camiseta.cod_cam);
      },
      error: () => {

        this.mostrarMensajeResena('Error al registrar tu reacción. Inténtalo de nuevo.', 'error');
      }
    });

  }

  borrarResena(idResena: number) {

    if (!this.authService.isLoggedIn()) {

      this.router.navigate(['/login']);
      return;
    }

    this.confirmarEliminar.set(idResena);
  }

  ejecutarBorrarResena() {

    const idResena = this.confirmarEliminar();
    if (!idResena) return;

    this.confirmarEliminar.set(null);
    this.eliminandoResena.set(idResena);

    this.resenaService.eliminarResena(idResena).subscribe({

      next: () => {

        this.eliminandoResena.set(null);
        this.cargarResenas(this.camiseta.cod_cam);
        this.exitoResena.set({ titulo: '¡Reseña Eliminada!', subtitulo: 'Tu reseña ha sido eliminada correctamente.' });
      },
      error: () => {

        this.eliminandoResena.set(null);
        this.mostrarMensajeResena('Error al eliminar la reseña. Inténtalo de nuevo.', 'error');
      }
    });
  }

}