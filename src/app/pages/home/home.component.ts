import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResenaService } from '../../services/resena.service';
import { CamisetasService } from '../../services/camisetas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  media = signal<number>(0);
  totalResenas = signal<number>(0);
  resenasRecientes = signal<any[]>([]);
  cargandoResenas = signal<boolean>(true);

  destacadas = signal<any[]>([]);
  cargandoDestacadas = signal<boolean>(true);

  constructor(
    private resenaService: ResenaService,
    private camisetasService: CamisetasService
  ) {}

  ngOnInit(): void {
    this.resenaService.getResenasRecientes().subscribe({
      next: (data) => {
        this.media.set(data.media);
        this.totalResenas.set(data.total);
        this.resenasRecientes.set(data.recientes);
        this.cargandoResenas.set(false);
      },
      error: () => this.cargandoResenas.set(false)
    });

    this.camisetasService.getDestacadas().subscribe({
      next: (data) => {
        this.destacadas.set(data);
        this.cargandoDestacadas.set(false);
      },
      error: () => this.cargandoDestacadas.set(false)
    });
  }

  mediaWidth(): string {
    return (this.media() / 5 * 100) + '%';
  }
}
