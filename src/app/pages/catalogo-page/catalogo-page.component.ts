import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamisetasService } from '../../services/camisetas.service';
import { FiltrosService } from '../../services/filtros.service';

import { Camiseta } from '../../interfaces/camiseta';
import { FiltrosCatalogo } from '../../interfaces/filtrosCatalogo';

import { CatalogoProductoComponent } from '../../components/catalogo-producto/catalogo-producto.component';
import { forkJoin } from 'rxjs';

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

  private camisetasService = inject(CamisetasService);
  private filtrosService = inject(FiltrosService);

  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  productosOriginales = signal<Camiseta[]>([]);

  // Señal con los filtros seleccionados por el usuario
  filtros = signal({

    liga: [] as string[],
    equipo: [] as string[],
    seleccion: [] as string[],
    temporada: [] as string[]
  });

  paginaActual = signal<number>(1);
  itemsPorPagina = 12; // Número de productos por página

  // Opciones de FiltrosService
  opciones = {

    ligas: [] as string[],
    equipos: [] as string[],
    selecciones: [] as string[],
    temporadas: [] as string[]
  };

  productosFiltrados = computed(() => {

    const productos = this.productosOriginales();
    const f = this.filtros();

    const hayFiltrosActivos = Object.values(f).some(lista => lista.length > 0);

    if (!hayFiltrosActivos) return productos;

    return productos.filter(p => {

      const cumpleLiga = f.liga.length === 0 || (p.liga && f.liga.includes(p.liga));
      const cumpleEquipo = f.equipo.length === 0 || (p.equipo && f.equipo.includes(p.equipo));
      const cumpleSeleccion = f.seleccion.length === 0 || (p.seleccion && f.seleccion.includes(p.seleccion));
      const cumpleTemporada = f.temporada.length === 0 || (p.temporada && f.temporada.includes(p.temporada));

      return cumpleLiga && cumpleEquipo && cumpleSeleccion && cumpleTemporada;
    });
  });


  productosAMostrar = computed(() => {

    const filtrados = this.productosFiltrados();
    const inicio = (this.paginaActual() - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;

    return filtrados.slice(inicio, fin);
  });

  totalPaginas = computed(() => {

    const total = Math.ceil(this.productosFiltrados().length / this.itemsPorPagina);
    return total > 0 ? total : 1;
  });

  ngOnInit(): void {

    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {

    this.loading.set(true);

    forkJoin({

      catalogo: this.camisetasService.getCatalogo(),
      ligas: this.filtrosService.getLigas(),
      equipos: this.filtrosService.getEquipos(),
      selecciones: this.filtrosService.getSelecciones(),
      temporadas: this.filtrosService.getTemporadas()
    }).subscribe({

      next: (res) => {

        this.productosOriginales.set(res.catalogo.data);

        this.opciones.ligas = res.ligas;
        this.opciones.equipos = res.equipos;
        this.opciones.selecciones = res.selecciones;
        this.opciones.temporadas = res.temporadas;

        this.loading.set(false);
      },
      error: (err) => {

        console.error('Error cargando el catálogo', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  acordeones = signal<Record<string, boolean>>({

    liga: false,
    equipo: false,
    seleccion: false,
    temporada: false,
  });

  toggle(keyHtml: string) {

    this.acordeones.update(valor => ({ ...valor, [keyHtml]: !valor[keyHtml] }));
  }

  aplicarFiltro(categoria: string, valor: string): void {
    // 1. Obtenemos los filtros que tenemos ahora mismo
    const copiaFiltros = this.filtros();

    // 2. Identificamos qué lista queremos tocar exactamente
    let listaModificada: string[] = [];

    if (categoria === 'liga') {

      listaModificada = [...copiaFiltros.liga];
    } else if (categoria === 'equipo') {

      listaModificada = [...copiaFiltros.equipo];
    } else if (categoria === 'seleccion') {

      listaModificada = [...copiaFiltros.seleccion];
    } else if (categoria === 'temporada') {
      
      listaModificada = [...copiaFiltros.temporada];
    }

    // 3. Buscamos si el valor ya está para ponerlo o quitarlo
    const existe = listaModificada.includes(valor);

    if (existe) {
      // Si ya existe, creamos una lista nueva sin ese valor (lo quitamos)
      listaModificada = listaModificada.filter(item => item !== valor);
    } else {
      // Si no existe, lo añadimos al final
      listaModificada.push(valor);
    }

    // 4. Guardamos la lista modificada en el lugar que le corresponde
    if (categoria === 'liga') copiaFiltros.liga = listaModificada;
    if (categoria === 'equipo') copiaFiltros.equipo = listaModificada;
    if (categoria === 'seleccion') copiaFiltros.seleccion = listaModificada;
    if (categoria === 'temporada') copiaFiltros.temporada = listaModificada;

    // 5. Actualizamos la Signal con el objeto entero modificado
    this.filtros.set({ ...copiaFiltros });

    // 6. Siempre volvemos a la página 1
    this.paginaActual.set(1);
  }

  /**
   * Control de navegación entre páginas
   */
  cambiarPagina(nueva: number): void {
    if (nueva > 0 && nueva <= this.totalPaginas()) {
      this.paginaActual.set(nueva);
      // Opcional: scroll suave hacia arriba al cambiar de página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }





}

