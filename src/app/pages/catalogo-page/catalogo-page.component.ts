import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamisetasService } from '../../services/camisetas.service';
import { FiltrosService } from '../../services/filtros.service';

import { Camiseta } from '../../interfaces/camiseta';
import { FiltrosCatalogo } from '../../interfaces/filtrosCatalogo';

import { CatalogoProductoComponent } from '../../components/catalogo-producto/catalogo-producto.component';

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
  error = false;

  // Lista de filtros aplicables
  filtros: FiltrosCatalogo = {

    liga: [],
    equipo: [],
    seleccion: [],
    temporada: [],
  };

  // Opciones mostradas en la página
  opciones = {

    ligas: [] as string[],
    equipos: [] as string[],
    selecciones: [] as string[],
    temporadas: [] as string[],
  };

  // Injección de servicios
  camisetasService = inject(CamisetasService);
  filtrosService = inject(FiltrosService);

  // Al cargarse la página
  ngOnInit(): void {

    this.cargarFiltros();
    this.cargarCatalogo();
  }

  // Cargar los filtros desde el back
  cargarFiltros() {

    this.filtrosService.getLigas().subscribe(res => this.opciones.ligas = res);
    this.filtrosService.getEquipos().subscribe(res => this.opciones.equipos = res);
    this.filtrosService.getSelecciones().subscribe(res => this.opciones.selecciones = res);
    this.filtrosService.getTemporadas().subscribe(res => this.opciones.temporadas = res);
  }

  // Cargar elementos del catálogo
  cargarCatalogo() {
    this.loading = true;

    const filtrosActivos = Object.fromEntries(
      Object.entries(this.filtros).filter(([_, v]) => v.length > 0)
    );

    this.camisetasService.getCatalogo(filtrosActivos).subscribe({

      next: (resp) => {

        this.productos = resp.data;
        this.loading = false;
      },
      error: () => {

        this.loading = false;
        this.error = true;
        
      }
    });
  }

  // Aplicar fitros y llamar al back
  aplicarFiltro(tipo: keyof FiltrosCatalogo, valor: string) {

    const lista = this.filtros[tipo];

    if (lista.includes(valor)) {

      this.filtros[tipo] = lista.filter(v => v !== valor);
    } else {
      
      this.filtros[tipo] = [...lista, valor];
    }

    this.cargarCatalogo();
  }
}

