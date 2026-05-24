import { PagoService } from './../../services/pago.service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumenPedidoComponent } from '../../components/resumen-pedido/resumen-pedido.component';
import { CarritoService } from '../../services/carrito.service';
import { DireccionService } from '../../services/direccion.service';
import { DetalleCarrito } from '../../interfaces/pedido.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { Direccion } from '../../interfaces/direccion.interface';
import { environment } from '../../../environments/environment';
import { ConfirmarPedidoReq, ConfirmarPedidoRes } from '../../interfaces/pago-interfaces';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ResumenPedidoComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  private fb = inject(FormBuilder);
  private pagoService = inject(PagoService);
  private carritoService = inject(CarritoService);
  private direccionService = inject(DireccionService);
  private router = inject(Router);

  detalles = signal<DetalleCarrito[]>([]);
  direcciones = signal<Direccion[]>([]);
  cargando = signal<boolean>(false);
  stripeListo = signal<boolean>(false);
  error = signal<null | string>(null);

  mostrarExito = signal<boolean>(false);
  datosPedido = signal<ConfirmarPedidoRes | null>(null);

  total = computed(() => {
    return this.detalles().reduce((acc, item) => {
      const precio = item.variante?.camiseta?.precio ?? 0;
      return acc + (precio * item.cantidad);
    }, 0);
  });

  checkoutForm = this.fb.group({
    cod_dir: [null as number | null, [Validators.required]]
  });

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos() {
    this.carritoService.obtenerCarrito().subscribe({
      next: (res: any) => {
        const datosRaw = res.detalles ? res.detalles : [];
        const datosNormalizados = datosRaw.map((item: any) => {
          if (item.variante) return item;
          return {
            ...item,
            variante: {
              talla: item.talla,
              camiseta: {
                nombre: item.nombre_camiseta,
                precio: parseFloat(item.precio),
                imagen_principal: item.imagen
              }
            }
          };
        });
        this.detalles.set(datosNormalizados);
      },
      error: (error) => {
        this.detalles.set([]);
      }
    });

    this.direccionService.obtener().subscribe({
      next: (lista) => {
        this.direcciones.set(lista);
        if (lista.length > 0) {
          this.checkoutForm.patchValue({ cod_dir: lista[0].cod_dir });
        }

        this.inicializarStripe(this.checkoutForm.value.cod_dir!);
      }
    });


  }

  private async inicializarStripe(cod_dir: number) {
    this.pagoService.crearIntentoDePago(cod_dir).subscribe({
      next: async (res) => {
        this.stripe = await loadStripe(environment.stripePublicKey);
        if (this.stripe) {
          this.elements = this.stripe.elements({
            clientSecret: res.clientSecret,
            appearance: { theme: 'night', variables: { colorPrimary: '#d4af37' } }
          });
          const paymentElement = this.elements.create('payment');
          paymentElement.mount('#payment-element');
          paymentElement.on('change', (event) => {
            this.stripeListo.set(event.complete);
          });
        }
      },
      error: (err) => {
        this.error.set('No se pudo cargar la pasarela de pago. Inténtalo de nuevo.');
        console.error('Error creando intento de pago:', err);
      }
    });
  }

  async confirmarCompra() {
    if (this.checkoutForm.invalid || !this.stripe || !this.elements || !this.stripeListo()) return;

    this.cargando.set(true);
    this.error.set(null);


    const { error, paymentIntent } = await this.stripe.confirmPayment({
      elements: this.elements,
      redirect: 'if_required',
    });

    if (error) {
      this.error.set(error.message || 'Error desconocido');
      this.cargando.set(false);
    } else if (paymentIntent?.status === 'succeeded') {
      this.finalizarPedidoLocal(paymentIntent.id);
    }
  }

  private finalizarPedidoLocal(stripeId: string) {
    const payload: ConfirmarPedidoReq = {
      cod_dir: this.checkoutForm.get('cod_dir')?.value!,
      stripe_id: stripeId,
    };

    this.pagoService.finalizarPedido(payload).subscribe({
      next: (res: ConfirmarPedidoRes) => {
        this.cargando.set(false);
        this.datosPedido.set(res);
        this.mostrarExito.set(true);
      },
      error: () => {
        this.error.set('Pago realizado pero error al registrar el pedido');
        this.cargando.set(false);
      }
    });
  }

}