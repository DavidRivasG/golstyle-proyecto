import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  // Injección de servicios
  private authService = inject(AuthService);
  private router = inject(Router);
  user: any = null;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user_data') || 'null');
    console.log('Usuario en perfil:', this.user);
  }

  // Cerrar sesión
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }
}
