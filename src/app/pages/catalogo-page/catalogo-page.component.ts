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

  totalPaginas = signal<number>(1);

  productosAMostrar = computed(() => {

    return this.productosOriginales();
  });

  // Genera el listado secuencial de todos los números de página
  paginasRango = computed(() => {

    const total = this.totalPaginas();
    const paginas: number[] = [];

    for (let i = 1; i <= total; i++) {

      paginas.push(i);
    }

    return paginas;
  });

  ngOnInit(): void {

    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {

    this.loading.set(true);

    forkJoin({

    forkJoin({
      // Pasamos los filtros actuales, página actual y cantidad por página al backend
      catalogo: this.camisetasService.getCatalogo(this.filtros(), this.paginaActual(), this.itemsPorPagina),
      ligas: this.filtrosService.getLigas(),
      equipos: this.filtrosService.getEquipos(),
      selecciones: this.filtrosService.getSelecciones(),
      temporadas: this.filtrosService.getTemporadas()
    }).subscribe({

      next: (res) => {
        // Guardar los productos devueltos por el backend para la página 1
        this.productosOriginales.set(res.catalogo.data);

        // Guardar el número total de páginas devuelto por el backend
        this.totalPaginas.set(res.catalogo.last_page || 1);
        this.opciones.ligas = res.ligas;
        this.opciones.equipos = res.equipos;
        this.opciones.selecciones = res.selecciones;
        this.opciones.temporadas = res.temporadas;
        this.loading.set(false);
      },
      error: (err) => {

        console.error('Error cargando el catálogo inicial', err);
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


  // Carga los productos filtrados y paginados desde el backend

  cargarProductos(): void {

    this.loading.set(true);

    this.camisetasService.getCatalogo(this.filtros(), this.paginaActual(), this.itemsPorPagina).subscribe({

      next: (res) => {
        // Actualizamos los productos de la página actual
        this.productosOriginales.set(res.data);
        // Actualizamos el total de páginas disponibles
        this.totalPaginas.set(res.last_page || 1);
        this.loading.set(false);
      },
      error: (err) => {

        console.error('Error cargando los productos', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }



  toggle(keyHtml: string) {

    this.acordeones.update(valor => ({ ...valor, [keyHtml]: !valor[keyHtml] }));
  }

  aplicarFiltro(categoria: string, valor: string): void {
    // Obtener los filtros que tenemos ahora mismo
    const copiaFiltros = this.filtros();

    // Identificar qué lista queremos tocar exactamente
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

    // Buscar si el valor ya está para ponerlo o quitarlo
    const existe = listaModificada.includes(valor);

    if (existe) {

      // Si ya existe, creamos una lista nueva sin ese valor (lo quitamos)
      listaModificada = listaModificada.filter(item => item !== valor);
    } else {

      // Si no existe lo añadimos
      listaModificada.push(valor);
    }

    // Guardar la lista modificada en el lugar que le corresponde
    if (categoria === 'liga') copiaFiltros.liga = listaModificada;
    if (categoria === 'equipo') copiaFiltros.equipo = listaModificada;
    if (categoria === 'seleccion') copiaFiltros.seleccion = listaModificada;
    if (categoria === 'temporada') copiaFiltros.temporada = listaModificada;

    // Actualizar la señal con el objeto entero modificado
    this.filtros.set({ ...copiaFiltros });

    // Siempre volvemos a la página 1
    this.paginaActual.set(1);

    // Cargar los productos correspondientes del backend
    this.cargarProductos();
  }


  cambiarPagina(nueva: number | string): void {

    const num = typeof nueva === 'string' ? parseInt(nueva, 10) : nueva;

    // Comprobar que la página es válida
    if (!isNaN(num) && num > 0 && num <= this.totalPaginas()) {

      this.paginaActual.set(num);

      // Cargarlos productos correspondientes del backend para la nueva página
      this.cargarProductos();
    }
  }





}

