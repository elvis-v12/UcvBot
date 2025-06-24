import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ✅ CORREGIDO

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  datosUsuario: any = {
    nombre: 'Sin nombre',
    apellido: 'Sin apellido',
    correo: '',
    user_uid: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (usuario.user_uid) {
      this.http.get(`http://localhost:5000/api/perfil?user_uid=${usuario.user_uid}`)
        .subscribe({
          next: (data: any) => {
            this.datosUsuario = data;
            console.log('Perfil cargado:', data);
          },
          error: (error) => {
            console.error('Error al obtener perfil:', error);
          }
        });
    } else {
      console.warn('⚠️ No se encontró user_uid en localStorage');
    }
  }
}
