import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo-producto.component.html',
  styleUrl: './catalogo-producto.component.css'
})
export class CatalogoProductoComponent {
  @Input() producto: any;
}
