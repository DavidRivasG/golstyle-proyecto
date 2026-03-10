import { Component, inject, OnInit } from '@angular/core';
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
  loading: boolean = true;
  error: string | null = null;

  ngOnInit(): void {
    console.log('MisPedidosComponent inicializado');
    const token = localStorage.getItem('auth_token');
    console.log('Token en localStorage:', token ? 'Presente' : 'No presente');
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.loading = true;
    this.error = null;
    console.log('Iniciando carga de pedidos...');
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        console.log('Pedidos recibidos:', data);
        this.pedidos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
        this.error = `Error: ${err.status} - ${err.statusText}`;
        this.loading = false;
      }
    });
  }

  onCancelarPedido(codPed: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar este pedido?')) {
      this.pedidoService.cancelarPedido(codPed).subscribe({
        next: () => {
          console.log(`Pedido ${codPed} cancelado correctamente`);
          this.loadPedidos(); // Recargar la lista de pedidos
        },
        error: (err) => {
          console.error('Error al cancelar pedido:', err);
          alert('Error al cancelar el pedido: ' + (err.error?.message || err.statusText));
        }
      });
    }
  }
}