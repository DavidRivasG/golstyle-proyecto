import { Component, OnInit } from '@angular/core';
import { CamisetasService } from '../../services/camisetas.service';
import { Camiseta } from '../../interfaces/camiseta';
import { FiltrosCatalogo } from '../../interfaces/filtrosCatalogo';
import { CatalogoProductoComponent } from '../../components/catalogo-producto/catalogo-producto.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-page',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoProductoComponent,
  ],
  templateUrl: './catalogo-page.component.html',
  styleUrls: ['./catalogo-page.component.css']
})

export class CatalogoPageComponent implements OnInit {

  productos: Camiseta[] = [];
  loading = true;

  // Filtros que tu API acepta
  filtros: FiltrosCatalogo = {
    liga: '',
    equipo: '',
    seleccion: '',
    temporada: ''
  };

  // Opciones del panel de filtros
  opciones = {
    ligas: ['LaLiga', 'Premier League', 'Bundesliga', 'Serie A'],
    equipos: ['Real Madrid', 'Barcelona', 'Betis', 'Arsenal', 'Bayern'],
    selecciones: ['España', 'Argentina', 'Brasil', 'Francia'],
    temporadas: ['2024/2025', '2025/2026']
  };

  constructor(private camisetasService: CamisetasService) {}

  ngOnInit(): void {
    this.cargarCatalogo();
  }

  cargarCatalogo() {
    this.loading = true;

    // Solo enviamos filtros que tengan valor
    const filtrosActivos = Object.fromEntries(
      Object.entries(this.filtros).filter(([_, v]) => v !== '')
    );

    this.camisetasService.getCatalogo(filtrosActivos).subscribe({
      next: (resp) => {
        this.productos = resp.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando catálogo', err);
        this.loading = false;
      }
    });
  }

  aplicarFiltro(tipo: keyof FiltrosCatalogo, valor: string) {
    // Si el filtro ya estaba seleccionado → lo deseleccionamos
    this.filtros[tipo] = this.filtros[tipo] === valor ? '' : valor;
    this.cargarCatalogo();
  }
}
