import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // ✅ NECESARIO AQUÍ
import { UsuarioService } from '../app/services/usuario.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // ✅ agrega HttpClientModule
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat implements OnInit {
  usuario: any;
  nombreUsuario: string = '';
  iniciales: string = 'US';
  mostrarMenu: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  async ngOnInit() {
    this.usuario = await this.usuarioService.obtenerPerfil();

    if (this.usuario) {
      this.nombreUsuario = `${this.usuario.nombre || ''} ${this.usuario.apellidoPaterno || ''} ${this.usuario.apellidoMaterno || ''}`.trim();
      const nombres = this.nombreUsuario.split(' ');
      this.iniciales = nombres.map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }
  }

  toggleMenu(): void {
    this.mostrarMenu = !this.mostrarMenu;
  }

  irPerfil(): void {
    this.mostrarMenu = false;
    this.router.navigate(['/perfil']);
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
