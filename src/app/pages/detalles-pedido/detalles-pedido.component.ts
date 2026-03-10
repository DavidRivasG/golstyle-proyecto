import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  
  pedido: any;
  loading: boolean = true;
  error: string | null = null;

  ngOnInit(): void {
    console.log('DetallesPedidoComponent inicializado');
    this.route.params.subscribe(params => {
      const codPed = params['id'];
      console.log('ID del pedido desde ruta:', codPed, 'tipo:', typeof codPed);
      if (codPed) {
        this.loadPedido(parseInt(codPed, 10));
      } else {
        this.error = 'No se encontró ID del pedido en la URL';
        this.loading = false;
      }
    });
  }

  loadPedido(codPed: number): void {
    this.loading = true;
    this.error = null;
    console.log('Iniciando carga del pedido con ID:', codPed);
    this.pedidoService.getPedido(codPed).subscribe({
      next: (data) => {
        console.log('✅ Pedido recibido correctamente:', data);
        this.pedido = data;
        console.log('Pedido asignado al componente:', this.pedido);
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar pedido:', err);
        console.error('Status:', err.status);
        console.error('Mensaje:', err.message);
        this.error = `Error: ${err.status} - ${err.statusText || err.message}`;
        this.loading = false;
      }
    });
  }

  onCancelarPedido(codPed: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar este pedido?')) {
      this.pedidoService.cancelarPedido(codPed).subscribe({
        next: () => {
          console.log(`Pedido ${codPed} cancelado correctamente`);
          window.location.href = '/mis-pedidos';
        },
        error: (err) => {
          console.error('Error al cancelar pedido:', err);
          alert('Error al cancelar el pedido: ' + (err.error?.message || err.statusText));
        }
      });
    }
  }
}
