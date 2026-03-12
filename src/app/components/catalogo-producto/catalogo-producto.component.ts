import { Component, Input } from '@angular/core';
import { Camiseta } from '../../interfaces/camiseta';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalogo-producto',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './catalogo-producto.component.html',
  styleUrls: ['./catalogo-producto.component.css']
})

export class CatalogoProductoComponent {
  
  // Obtener la camiseta del padre
  @Input() camiseta!: Camiseta;
}
