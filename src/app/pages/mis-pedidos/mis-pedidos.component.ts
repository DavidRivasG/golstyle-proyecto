import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { PedidoItemComponent } from '../../components/pedido-item/pedido-item.component';
import { Pedido } from '../../interfaces/pedido.interface';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, PedidoItemComponent],
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  private pedidoService = inject(PedidoService);

  pedidos: Pedido[] = [];
  loading = true;
  error: string | null = null;
  cancelando = false;

  confirmarCancelar = signal<number | null>(null);
  exitoCancelar = signal<{ titulo: string; subtitulo: string } | null>(null);
  errorCancelar = signal<string | null>(null);

  ngOnInit(): void {
    this.cargarPedidos();
  }

  private cargarPedidos(): void {
    this.loading = true;
    this.error = null;
    this.pedidoService.getPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los pedidos';
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
    this.cancelando = true;

    this.pedidoService.cancelarPedido(id).subscribe({
      next: () => {
        this.cancelando = false;
        this.cargarPedidos();
        this.exitoCancelar.set({
          titulo: '¡Pedido Cancelado!',
          subtitulo: 'Tu pedido ha sido cancelado correctamente.'
        });
      },
      error: (err) => {
        this.cancelando = false;
        const texto = err.error?.error || err.error?.message || 'Error al cancelar el pedido.';
        this.errorCancelar.set(texto);
        setTimeout(() => this.errorCancelar.set(null), 4000);
      }
    });
  }
}
