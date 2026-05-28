import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-pedido-view.component.html',
  styleUrls: ['./detalle-pedido-view.component.css']
})
export class DetallePedidoViewComponent {
  @Input() pedido: any;
  @Output() cancelar = new EventEmitter<number>();

  onCancelar() {
    this.cancelar.emit(this.pedido.pedido.cod_ped);
  }
}
