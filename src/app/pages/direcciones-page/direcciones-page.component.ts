import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Direccion } from '../../interfaces/direccion.interface';
import { DireccionService } from '../../services/direccion.service';

@Component({
  selector: 'app-direcciones-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './direcciones-page.component.html',
  styleUrl: './direcciones-page.component.css'
})
export class DireccionesPageComponent implements OnInit {
  direcciones: Direccion[] = [];
  form: Partial<Direccion> = {
    nombre: '',
    calle: '',
    num: '',
    piso: '',
    cp: '',
    telefono: '',
    ciudad: '',
    provincia: ''
  };
  editingId: number | null = null;
  mensaje: string = '';

  constructor(private direccionService: DireccionService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.direccionService.obtener().subscribe({
      next: dirs => (this.direcciones = dirs),
      error: err => console.error(err)
    });
  }

  guardar(): void {
    if (this.editingId) {
      this.direccionService
        .actualizar(this.editingId, this.form)
        .subscribe({
          next: res => {
            this.mensaje = res.mensaje || 'Dirección actualizada';
            this.cancelarEdicion();
            this.cargar();
          },
          error: err => console.error(err)
        });
    } else {
      this.direccionService.crear(this.form).subscribe({
        next: res => {
          this.mensaje = res.mensaje || 'Dirección agregada';
          this.limpiarFormulario();
          this.cargar();
        },
        error: err => console.error(err)
      });
    }
  }

  editar(d: Direccion): void {
    this.editingId = d.cod_dir || null;
    this.form = { ...d };
  }

  cancelarEdicion(): void {
    this.editingId = null;
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.form = {
      nombre: '',
      calle: '',
      num: '',
      piso: '',
      cp: '',
      telefono: '',
      ciudad: '',
      provincia: ''
    };
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar esta dirección?')) {
      this.direccionService.eliminar(id).subscribe({
        next: res => {
          this.mensaje = res.mensaje || 'Dirección eliminada';
          this.cargar();
        },
        error: err => console.error(err)
      });
    }
  }
}
