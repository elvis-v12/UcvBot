import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
   selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.scss']
})
export class Registro {
  username: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  carrera: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  registroError: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.registroError = 'Las contraseñas no coinciden.';
      return;
    }
    
    if (!this.email.endsWith('@ucvvirtual.edu.pe')) {
      this.registroError = 'El correo debe ser institucional (@ucvvirtual.edu.pe).';
      return;
    }


    // Simular envío
    console.log('Datos enviados:', {
      username: this.username,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      carrera: this.carrera,
      email: this.email,
      password: this.password
    });
    
    this.registroError = '';
    alert('Registro exitoso!');
  }
  

  goTologin(): void {
    this.router.navigate(['/login']);
  }
}
