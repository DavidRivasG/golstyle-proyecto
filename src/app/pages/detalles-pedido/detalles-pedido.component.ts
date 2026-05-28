import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { DetallePedidoViewComponent } from '../../components/detalle-pedido-view/detalle-pedido-view.component';

@Component({
  selector: 'app-detalles-pedido',
  standalone: true,
  imports: [CommonModule, DetallePedidoViewComponent],
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {

  private pedidoService = inject(PedidoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pedido: any | null = null;
  loading = true;
  error: string | null = null;

  confirmarCancelar = signal<number | null>(null);
  exitoCancelar = signal<boolean>(false);
  errorCancelar = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID de pedido no válido';
      this.loading = false;
      return;
    }
    this.cargarPedido(id);
  }

  private cargarPedido(id: number): void {
    this.loading = true;
    this.error = null;
    this.pedidoService.getPedido(id).subscribe({
      next: (pedido) => {
        this.pedido = pedido;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el pedido';
        this.loading = false;
      }
    });
  }

  onCancelarPedido(codPed: number): void {
    this.confirmarCancelar.set(codPed);
  }

  ejecutarCancelar(): void {
    const id = this.confirmarCancelar();
    if (!id) return;
    this.confirmarCancelar.set(null);

    this.pedidoService.cancelarPedido(id).subscribe({
      next: () => {
        this.exitoCancelar.set(true);
      },
      error: (err) => {
        const texto = err.error?.error || err.error?.message || 'Error al cancelar el pedido.';
        this.errorCancelar.set(texto);
        setTimeout(() => this.errorCancelar.set(null), 4000);
      }
    });
  }

  irAPedidos(): void {
    this.router.navigate(['/mis-pedidos']);
  }
}
