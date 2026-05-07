import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  mensaje: string = '';
  loading: boolean = true;
  error: boolean = false;

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
          this.error = true;
          this.mensaje = 'Dirección no encontrada';
        }
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
        this.error = true;
        this.mensaje = 'Error al cargar la dirección';
      }
    });
  }

  guardar(): void {
    this.mensaje = '';
    this.error = false;
    this.direccionService.actualizar(this.id, this.form).subscribe({
      next: () => this.router.navigate(['/direcciones']),
      error: err => {
        console.error(err);
        this.error = true;
        this.mensaje = err.error?.message || 'Error al actualizar la dirección';
      }
    });
  }
}
