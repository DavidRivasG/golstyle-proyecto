import { Component, Input } from '@angular/core';
import { Camiseta } from '../../interfaces/camiseta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-producto',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './catalogo-producto.component.html',
  styleUrls: ['./catalogo-producto.component.css']
})

export class CatalogoProductoComponent {
  
  @Input() camiseta!: Camiseta;
}
