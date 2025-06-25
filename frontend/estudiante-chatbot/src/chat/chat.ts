import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../app/services/usuario.service';
import { IaService } from '../app/services/ia.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat implements OnInit {
  usuario: any;
  nombreUsuario: string = '';
  iniciales: string = 'US';
  mostrarMenu: boolean = false;
  respuestaIA: string = '';
  nuevaPregunta: string = '';
  mensajes: { de: 'usuario' | 'bot', texto: string }[] = [];

  sessionId: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private iaService: IaService
  ) {}

    async ngOnInit() {
      this.usuario = await this.usuarioService.obtenerPerfil();

      if (this.usuario) {
        this.nombreUsuario = `${this.usuario.nombre || ''} ${this.usuario.apellidoPaterno || ''} ${this.usuario.apellidoMaterno || ''}`.trim();
        const nombres = this.nombreUsuario.split(' ');
        this.iniciales = nombres.map(n => n[0]).join('').substring(0, 2).toUpperCase();

        const sessionGuardada = localStorage.getItem('session_id');
        if (sessionGuardada) {
          this.sessionId = sessionGuardada;
          this.cargarHistorial(); // ✅ Cargar mensajes anteriores
        } else {
          this.nuevoChat();
        }

        this.cargarSesionesAnteriores(); // ✅ Cargar historial lateral de sesiones
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
    localStorage.removeItem('session_id');
    this.router.navigate(['/login']);
  }

  generarSessionId(): string {
    return crypto.randomUUID();
  }

  crearSesionEnBD(session_id: string): void {
    if (!this.usuario?.user_uid || !session_id) return;

    this.iaService.crearSesion({ session_id, student_id: this.usuario.user_uid }).subscribe({
      next: (res) => console.log('✅ Sesión creada:', res),
      error: (err) => console.error('❌ Error al crear sesión:', err)
    });
  }

  nuevoChat() {
    this.sessionId = this.generarSessionId();
    localStorage.setItem('session_id', this.sessionId);
    this.crearSesionEnBD(this.sessionId);
    this.mensajes = [];
    this.nuevaPregunta = '';
  }

  cargarHistorial(): void {
    this.iaService.obtenerMensajes(this.sessionId, this.usuario.user_uid).subscribe({
      next: (res) => {
       this.mensajes = res;


      },
      error: (err) => {
        console.error('❌ Error al cargar historial:', err);
        this.mensajes = [];
      }
    });
  }
sesiones: { session_id: string, ultima_fecha: string }[] = [];

cargarSesionesAnteriores(): void {
  if (!this.usuario?.user_uid) return;

  this.iaService.obtenerSesiones(this.usuario.user_uid).subscribe({
    next: (res) => {
      this.sesiones = res;
    },
    error: (err) => {
      console.error("❌ Error cargando sesiones:", err);
    }
  });
}
cargarSesion(session_id: string): void {
  this.sessionId = session_id;
  localStorage.setItem('session_id', session_id);
  this.cargarHistorial();
}

  async enviarPreguntaIA(pregunta: string): Promise<void> {
    if (!this.usuario?.user_uid || !pregunta.trim() || !this.sessionId) return;

    try {
      const resultado = await this.iaService
        .enviarPregunta(pregunta, this.usuario.user_uid, this.sessionId)
        .toPromise();

      this.respuestaIA = resultado.respuesta || 'Sin respuesta';
      this.mensajes.push({ de: 'usuario', texto: pregunta });
      this.mensajes.push({ de: 'bot', texto: this.respuestaIA });
      this.nuevaPregunta = '';
    } catch (error) {
      console.error('❌ Error al contactar con la IA:', error);
    }
  }
}
