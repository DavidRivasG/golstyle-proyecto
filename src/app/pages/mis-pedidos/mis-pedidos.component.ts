import { Component, OnInit, inject } from '@angular/core';
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

  // Injección de servicio
  private pedidoService = inject(PedidoService);

  pedidos: Pedido[] = [];
  loading = true;
  error: string | null = null;
  mensajeCancelacion: { texto: string; tipo: 'error' | 'exito' } | null = null;

  ngOnInit(): void {
    this.cargarPedidos();
  }

  // Cargar los pedidos
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

  // Cancelar el pedido
  onCancelarPedido(codPed: number): void {
    const confirmar = confirm('¿Estás seguro de que deseas cancelar este pedido?');
    if (!confirmar) return;

    this.pedidoService.cancelarPedido(codPed).subscribe({
      next: () => {
        this.mensajeCancelacion = { texto: 'Pedido cancelado correctamente.', tipo: 'exito' };
        setTimeout(() => this.mensajeCancelacion = null, 4000);
        this.cargarPedidos();
      },
      error: (err) => {
        const texto = err.error?.message || 'Error al cancelar el pedido. Inténtalo de nuevo.';
        console.error(texto);
        this.mensajeCancelacion = { texto, tipo: 'error' };
        setTimeout(() => this.mensajeCancelacion = null, 4000);
      }
    });
  }
}
