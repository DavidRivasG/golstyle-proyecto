import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  // ESTAS DOS LÍNEAS SON LA CLAVE PARA QUE SE VEA EL NUEVO DISEÑO:
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = '';
  products: Product[] = []; 

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cargarProductos();
    /* const datosGuardados = localStorage.getItem('usuarioLogueado');
    
    if (datosGuardados) {
      const usuarioObj = JSON.parse(datosGuardados);
      this.nombreUsuario = usuarioObj.nombre;
      this.cargarProductos();
    } else {
      this.router.navigate(['/login']);
    } */
  }

  cargarProductos() {
    this.productService.getBestSellers().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error conectando a BD, usando datos de prueba:', err);
        // Datos de respaldo por si falla la base de datos
        this.products = [
            { id: 1, name: 'Real Madrid 25/26', image: 'assets/images/madrid.png' },
            { id: 2, name: 'Real Betis 25/26', image: 'assets/images/betis.png' },
            { id: 3, name: 'Arsenal 25/26', image: 'assets/images/arsenal.png' },
            { id: 4, name: 'Barcelona 25/26', image: 'assets/images/barca.png' },
            { id: 5, name: 'Bayern 25/26', image: 'assets/images/bayern.png' },
        ];
      }
    });
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/login']);
  }
}