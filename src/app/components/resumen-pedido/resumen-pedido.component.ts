import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleCarrito } from '../../interfaces/pedido.interface';

@Component({
  selector: 'app-resumen-pedido',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './resumen-pedido.component.html',
  styleUrl: './resumen-pedido.component.css'
})
export class ResumenPedidoComponent {

  @Input() detalles: DetalleCarrito[] = [];
  @Input() total: number = 0;

  getImagenUrl(det: any): string {

    if (det.variante?.camiseta?.imagen_principal) {
      return det.variante.camiseta.imagen_principal;
    }

    // 2. Si no existe la anterior, intentamos la ruta plana (la que manda tu Back ahora)
    if (det.imagen) {
      return det.imagen;
    }

    // 3. Si no hay nada, imagen por defecto
    return 'assets/placeholder-camiseta.png';
  }
}
