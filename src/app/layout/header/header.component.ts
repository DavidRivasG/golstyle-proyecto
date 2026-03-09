import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  onLoginClick() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/perfil']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
