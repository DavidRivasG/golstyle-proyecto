import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthService);

  getUserRoute(): string {
    return this.authService.isLoggedIn() ? 'perfil' : 'login';
  }
}
