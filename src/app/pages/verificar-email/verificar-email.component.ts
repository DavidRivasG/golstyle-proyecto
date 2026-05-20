import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-verificar-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit {

  estado: 'cargando' | 'exito' | 'error' = 'cargando';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const urlLaravel = params['url'];

      if (urlLaravel) {
        this.verificarEnBackend(urlLaravel);
      } else {
        this.estado = 'error';
      }
    });
  }

  verificarEnBackend(url: string) {
    this.http.get(url).subscribe({
      next: (respuesta) => {
        this.estado = 'exito';
        console.log("Verificación exitosa:", respuesta);
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error) => {
        this.estado = 'error';
        console.error('ERROR REAL DE LARAVEL:', error);
      }
    });
  }
}