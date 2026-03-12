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

  private pedidoService = inject(PedidoService);

  pedidos: Pedido[] = [];
  loading = true;
  error: string | null = null;

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
    const confirmar = confirm('¿Estás seguro de que deseas cancelar este pedido?');
    if (!confirmar) return;

    this.pedidoService.cancelarPedido(codPed).subscribe({
      next: () => this.cargarPedidos(),
      error: (err) =>
        alert(err.error?.message || 'Error al cancelar el pedido')
    });
  }
}
