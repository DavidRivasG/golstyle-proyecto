import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Direccion } from '../../interfaces/direccion.interface';
import { DireccionService } from '../../services/direccion.service';

@Component({
  selector: 'app-direcciones-crear-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './direcciones-crear-page.component.html',
  styleUrl: './direcciones-crear-page.component.css'
})
export class DireccionesCrearPageComponent {
  form: Partial<Direccion> = {
    nombre: '', calle: '', num: '', piso: '', cp: '', telefono: '', ciudad: '', provincia: ''
  };
  guardando = false;
  submitted = false;
  errorServidor = '';
  exitoGuardar = signal<{ titulo: string; subtitulo: string } | null>(null);

  constructor(
    private router: Router,
    private direccionService: DireccionService
  ) {}

  guardar(formDir: NgForm): void {
    this.submitted = true;
    if (formDir.invalid) return;
    this.errorServidor = '';
    this.guardando = true;
    this.direccionService.crear(this.form).subscribe({
      next: () => {
        this.guardando = false;
        this.exitoGuardar.set({ titulo: '¡Dirección Guardada!', subtitulo: 'Tu dirección ha sido añadida correctamente.' });
      },
      error: err => {
        this.guardando = false;
        this.errorServidor = err.status === 422
          ? err.error?.message || 'Datos inválidos'
          : 'Error inesperado al crear la dirección';
      }
    });
  }

  cerrarExito(): void {
    this.exitoGuardar.set(null);
    this.router.navigate(['/direcciones']);
  }
}
