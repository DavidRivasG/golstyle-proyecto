import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-pedido-view.component.html',
  styleUrls: ['./detalle-pedido-view.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DetallePedidoViewComponent implements OnInit, OnChanges {
  @Input() pedido: any;
  @Output() cancelar = new EventEmitter<number>();

  ngOnInit() {
    //
  }

  ngOnChanges() {
    //
  }

  // Enviar el código del pedido al padre para cancelar el pedido
  onCancelar() {
    this.cancelar.emit(this.pedido.pedido.cod_ped);
  }
}