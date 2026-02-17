import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  listaProductos = [
    { nombre: 'REAL MADRID 25/26', precio: 69, imagen: 'assets/images/madrid.png', club: 'Real Madrid', temporada: 'actual', liga: 'La Liga' },
    { nombre: 'BAYER 25/26', precio: 49, imagen: 'assets/images/bayern.png', club: 'Bayern Munich', temporada: 'actual', liga: 'Bundesliga' },
    { nombre: 'BARCELONA 25/26', precio: 99, imagen: 'assets/images/barca.png', club: 'Barcelona', temporada: 'actual', liga: 'La Liga' },
    { nombre: 'ARSENAL 25/26', precio: 99, imagen: 'assets/images/arsenal.png', club: 'Arsenal', temporada: 'retro', liga: 'Premier League' },
    { nombre: 'BETIS 25/26', precio: 99, imagen: 'assets/images/betis.png', club: 'Betis', temporada: 'actual', liga: 'La Liga' },
    { nombre: 'REAL MADRID 90S', precio: 69, imagen: 'assets/images/madrid.png', club: 'Real Madrid', temporada: 'retro', liga: 'La Liga' },
    { nombre: 'JUVENTUS 25/26', precio: 49, imagen: 'assets/images/bayern.png', club: 'Juventus', temporada: 'actual', liga: 'Serie A' },
    { nombre: 'ESPAÑA', precio: 99, imagen: 'assets/images/barca.png', seleccion: 'España', temporada: 'actual', liga: 'Selecciones' },
    { nombre: 'ITALIA', precio: 99, imagen: 'assets/images/arsenal.png', seleccion: 'Italia', temporada: 'retro', liga: 'Selecciones' },
    { nombre: 'FRANCIA', precio: 99, imagen: 'assets/images/betis.png', seleccion: 'Francia', temporada: 'actual', liga: 'Selecciones' },
  ];

  // Filtros expandibles
  filtrosExpandidos = {
    clubes: false,
    selecciones: false,
    temporada: false,
    ligas: false
  };

  // Filtros seleccionados
  filtrosActivos = {
    clubes: [] as string[],
    selecciones: [] as string[],
    temporada: [] as string[],
    ligas: [] as string[]
  };

  // Opciones disponibles
  opciones = {
    clubes: ['Real Madrid', 'Barcelona', 'Bayern Munich', 'Arsenal', 'Betis', 'Juventus'],
    selecciones: ['España', 'Italia', 'Francia', 'Alemania', 'Portugal'],
    temporada: ['Actual', 'Retro'],
    ligas: ['La Liga', 'Premier League', 'Bundesliga', 'Serie A', 'Selecciones']
  };

  toggleFiltro(filtro: string) {
    this.filtrosExpandidos[filtro as keyof typeof this.filtrosExpandidos] = 
      !this.filtrosExpandidos[filtro as keyof typeof this.filtrosExpandidos];
  }

  toggleClub(club: string) {
    const index = this.filtrosActivos.clubes.indexOf(club);
    if (index > -1) {
      this.filtrosActivos.clubes.splice(index, 1);
    } else {
      this.filtrosActivos.clubes.push(club);
    }
  }

  toggleSeleccion(seleccion: string) {
    const index = this.filtrosActivos.selecciones.indexOf(seleccion);
    if (index > -1) {
      this.filtrosActivos.selecciones.splice(index, 1);
    } else {
      this.filtrosActivos.selecciones.push(seleccion);
    }
  }

  toggleTemporada(temporada: string) {
    const index = this.filtrosActivos.temporada.indexOf(temporada.toLowerCase());
    if (index > -1) {
      this.filtrosActivos.temporada.splice(index, 1);
    } else {
      this.filtrosActivos.temporada.push(temporada.toLowerCase());
    }
  }

  toggleLiga(liga: string) {
    const index = this.filtrosActivos.ligas.indexOf(liga);
    if (index > -1) {
      this.filtrosActivos.ligas.splice(index, 1);
    } else {
      this.filtrosActivos.ligas.push(liga);
    }
  }

  get productosFiltrados() {
    return this.listaProductos.filter(producto => {
      // Filtro por club
      if (this.filtrosActivos.clubes.length > 0) {
        if (!producto.club || !this.filtrosActivos.clubes.includes(producto.club)) return false;
      }

      // Filtro por selección
      if (this.filtrosActivos.selecciones.length > 0) {
        if (!producto.seleccion || !this.filtrosActivos.selecciones.includes(producto.seleccion)) return false;
      }

      // Filtro por temporada
      if (this.filtrosActivos.temporada.length > 0) {
        if (!this.filtrosActivos.temporada.includes(producto.temporada)) return false;
      }

      // Filtro por liga
      if (this.filtrosActivos.ligas.length > 0) {
        if (!this.filtrosActivos.ligas.includes(producto.liga)) return false;
      }

      return true;
    });
  }
}
