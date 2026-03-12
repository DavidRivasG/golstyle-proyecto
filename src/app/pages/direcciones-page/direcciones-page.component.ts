import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Direccion } from '../../interfaces/direccion.interface';
import { DireccionService } from '../../services/direccion.service';

@Component({
  selector: 'app-direcciones-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
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
  loading: boolean = true;
  error: boolean = false;

  // Injección de servicios
  constructor(private direccionService: DireccionService) { }

  ngOnInit(): void {
    this.cargar();
  }

  // Cargar las direcciones del usuario
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

  // Guardar una dirección nueva o editada
  guardar(): void {
    this.mensaje = '';
    this.error = false;

    if (this.editingId) {
      // Modo edición
      this.direccionService.actualizar(this.editingId, this.form).subscribe({
        next: res => {
          this.mensaje = res.mensaje || 'Dirección actualizada';
          this.cancelarEdicion();
          this.cargar();
        },
        error: err => {
          console.error(err);
          this.error = true;
          this.mensaje = err.error?.message || 'Error al actualizar la dirección';
        }
      });
    } else {
      // Modo creación
      this.direccionService.crear(this.form).subscribe({
        next: res => {
          this.mensaje = res.mensaje || 'Dirección agregada';
          this.limpiarFormulario();
          this.cargar();
        },
        error: err => {
          console.error(err);
          this.error = true;

          if (err.status === 422) {
            this.mensaje = err.error?.message || 'Datos inválidos';
          } else {
            this.mensaje = 'Error inesperado al crear la dirección';
          }
        }
      });
    }
  }

  editar(d: Direccion): void {
    this.editingId = d.cod_dir || null;
    this.form = { ...d };
  }

  // Cancelar edición
  cancelarEdicion(): void {
    this.editingId = null;
    this.limpiarFormulario();
  }

  // Reset del formulario
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

  //  Confirmación de la eliminación de una dirección
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
