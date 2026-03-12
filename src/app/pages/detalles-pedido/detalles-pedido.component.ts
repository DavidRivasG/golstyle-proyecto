import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { DetallePedidoViewComponent } from '../../components/detalle-pedido-view/detalle-pedido-view.component';
import { Pedido } from '../../interfaces/pedido.interface';

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

  pedido: Pedido | null = null;
  loading = true;
  error: string | null = null;

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
    const confirmar = confirm('¿Estás seguro de que deseas cancelar este pedido?');

    if (!confirmar) return;

    this.pedidoService.cancelarPedido(codPed).subscribe({
      next: () => this.router.navigate(['/mis-pedidos']),
      error: (err) =>
        alert(err.error?.message || 'Error al cancelar el pedido')
    });
  }
}
