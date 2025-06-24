import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  activeTab: 'buscar' | 'pregunta' = 'buscar';

  searchTerm = '';
  selectedNivel = '';
  preguntaTitulo = '';
  preguntaContenido = '';
  alternativas = ['', '', '', ''];
  indiceCorrecta = '';
  mensaje = '';

  niveles = ['Básico', 'Intermedio', 'Avanzado'];

  estudiantes = [
    { nombre: 'Juan Pérez', usuario: 'juan123', nivel: 'Básico', progreso: 40 },
    { nombre: 'María López', usuario: 'maria456', nivel: 'Intermedio', progreso: 65 },
    { nombre: 'Carlos Ruiz', usuario: 'carlos789', nivel: 'Avanzado', progreso: 90 },
  ];

  get filteredStudent() {
    const term = this.searchTerm.trim().toLowerCase();
    return this.estudiantes.find(e =>
      e.nombre.toLowerCase().includes(term) || e.usuario.toLowerCase().includes(term)
    );
  }

  selectNivel(n: string) {
    this.selectedNivel = n;
  }

  subirPregunta() {
    if (!this.selectedNivel || !this.preguntaTitulo || !this.preguntaContenido ||
        this.alternativas.some(a => !a) || !['1','2','3','4'].includes(this.indiceCorrecta)) {
      this.mensaje = 'Completa todos los campos y selecciona nivel & alternativa correcta.';
      return;
    }
    this.mensaje = `✅ Pregunta subida al nivel ${this.selectedNivel}.`;
    // Reset
    this.selectedNivel = '';
    this.preguntaTitulo = '';
    this.preguntaContenido = '';
    this.alternativas = ['', '', '', ''];
    this.indiceCorrecta = '';
  }
}
