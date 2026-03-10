import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Pedido } from '../../interfaces/pedido.interface';

@Component({
  selector: 'app-pedido-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.css']
})
export class PedidoItemComponent {
  @Input() pedido!: Pedido;
  @Output() cancelar = new EventEmitter<number>();

  onCancelar() {
    this.cancelar.emit(this.pedido.cod_ped);
  }
}