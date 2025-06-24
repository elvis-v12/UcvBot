import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
imports: [CommonModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat implements OnInit {
  nombre: string = '';
  iniciales: string = 'US';
  nombreUsuario: string = '';
  mostrarMenu: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const datos = localStorage.getItem('usuario');
      if (datos) {
        const info = JSON.parse(datos);
        this.nombre = info.nombre || '';
        this.nombreUsuario = `${info.nombre || ''} ${info.apellido || ''}`.trim();
        const nombres = this.nombreUsuario.split(' ');
        this.iniciales = nombres.map(n => n[0]).join('').substring(0, 2).toUpperCase();
      }
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
