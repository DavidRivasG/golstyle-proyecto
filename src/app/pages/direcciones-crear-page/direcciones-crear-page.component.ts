import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  mensaje: string = '';
  error: boolean = false;

  constructor(
    private router: Router,
    private direccionService: DireccionService
  ) {}

  guardar(): void {
    this.mensaje = '';
    this.error = false;
    this.direccionService.crear(this.form).subscribe({
      next: () => this.router.navigate(['/direcciones']),
      error: err => {
        console.error(err);
        this.error = true;
        this.mensaje = err.status === 422
          ? err.error?.message || 'Datos inválidos'
          : 'Error inesperado al crear la dirección';
      }
    });
  }
}
