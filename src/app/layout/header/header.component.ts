import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  carritoService = inject(CarritoService);

  ngOnInit(): void {
    this.carritoService.cargarTotal();
  }

  getUserRoute(): string {
    return this.authService.isLoggedIn() ? 'perfil' : 'login';
  }
}
