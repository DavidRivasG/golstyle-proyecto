import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Direccion } from '../../interfaces/direccion.interface';
import { DireccionService } from '../../services/direccion.service';

@Component({
  selector: 'app-direcciones-editar-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './direcciones-editar-page.component.html',
  styleUrl: './direcciones-editar-page.component.css'
})
export class DireccionesEditarPageComponent implements OnInit {
  form: Partial<Direccion> = {
    nombre: '', calle: '', num: '', piso: '', cp: '', telefono: '', ciudad: '', provincia: ''
  };
  id: number = 0;
  loading: boolean = true;
  errorCarga = '';
  guardando = false;
  submitted = false;
  errorServidor = '';
  exitoGuardar = signal<{ titulo: string; subtitulo: string } | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private direccionService: DireccionService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.direccionService.obtener().subscribe({
      next: dirs => {
        const dir = dirs.find(d => d.cod_dir === this.id);
        if (dir) {
          this.form = { ...dir };
        } else {
          this.errorCarga = 'Dirección no encontrada';
        }
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
        this.errorCarga = 'Error al cargar la dirección';
      }
    });
  }

  guardar(formDir: NgForm): void {
    this.submitted = true;
    if (formDir.invalid) return;
    this.errorServidor = '';
    this.guardando = true;
    this.direccionService.actualizar(this.id, this.form).subscribe({
      next: () => {
        this.guardando = false;
        this.exitoGuardar.set({ titulo: '¡Dirección Actualizada!', subtitulo: 'Los cambios han sido guardados correctamente.' });
      },
      error: err => {
        this.guardando = false;
        this.errorServidor = err.error?.message || 'Error al actualizar la dirección';
      }
    });
  }

  cerrarExito(): void {
    this.exitoGuardar.set(null);
    this.router.navigate(['/direcciones']);
  }
}
