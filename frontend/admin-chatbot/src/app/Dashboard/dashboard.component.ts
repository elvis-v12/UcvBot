import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Student{
  nombre: String, 
  usuario: String, 
  nivel: String, 
  progreso: number
}

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

  constructor(private http: HttpClient, private router: Router) {}
  

  niveles = ['Básico', 'Intermedio', 'Avanzado'];

  estudiantes: Student[] = [];

  ngOnInit() {
    this.CargarEstudiantes();
  }

  CargarEstudiantes() {
  this.http.get<any[]>('http://localhost:5000/api/students')
    .subscribe({
      next: (response) => {
        this.estudiantes = response.map(est => ({
          nombre: est.v_apellidoPaterno +" "+est.v_apellidoMaterno,//en la bd no sale nombre real
          usuario: est.v_userName || "",
          nivel: this.niveles[est.level_id-1] || "",
          progreso: est.v_score
        }));
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
      }
    });
}



  get filteredStudents(): Student[] {
  const term = this.searchTerm.trim().toLowerCase();
  if (!term) return []; // si está vacío, no devuelve nada
  return this.estudiantes.filter(e =>
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
