import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(@Inject(AuthService) private authService: AuthService) { }

  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logOut();
  }

}
