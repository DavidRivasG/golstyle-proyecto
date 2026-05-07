import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Direccion } from '../../interfaces/direccion.interface';
import { DireccionService } from '../../services/direccion.service';

@Component({
  selector: 'app-direcciones-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './direcciones-page.component.html',
  styleUrl: './direcciones-page.component.css'
})
export class DireccionesPageComponent implements OnInit {
  direcciones: Direccion[] = [];
  mensaje: string = '';
  loading: boolean = true;
  error: boolean = false;

  constructor(private direccionService: DireccionService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.direccionService.obtener().subscribe({
      next: dirs => {
        this.direcciones = dirs;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar esta dirección?')) {
      this.direccionService.eliminar(id).subscribe({
        next: res => {
          this.mensaje = res.mensaje || 'Dirección eliminada';
          this.error = false;
          this.cargar();
        },
        error: err => {
          console.error(err);
          this.error = true;
          this.mensaje = 'Error al eliminar la dirección';
        }
      });
    }
  }
}
