import { Component, OnInit, signal } from '@angular/core';
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
  loading: boolean = true;
  errorCarga = false;
  eliminando = false;
  confirmarEliminar = signal<number | null>(null);
  exitoEliminar = signal<{ titulo: string; subtitulo: string } | null>(null);

  constructor(private direccionService: DireccionService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.errorCarga = false;
    this.direccionService.obtener().subscribe({
      next: dirs => {
        this.direcciones = dirs;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
        this.errorCarga = true;
      }
    });
  }

  eliminar(id: number): void {
    this.confirmarEliminar.set(id);
  }

  ejecutarEliminar(): void {
    const id = this.confirmarEliminar();
    if (!id) return;
    this.confirmarEliminar.set(null);
    this.eliminando = true;
    this.direccionService.eliminar(id).subscribe({
      next: () => {
        this.eliminando = false;
        this.cargar();
        this.exitoEliminar.set({ titulo: '¡Dirección Eliminada!', subtitulo: 'La dirección ha sido eliminada correctamente.' });
      },
      error: err => {
        console.error(err);
        this.eliminando = false;
      }
    });
  }
}
