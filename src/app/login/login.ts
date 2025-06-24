import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
   imports: [CommonModule, FormsModule],
})
export class Login {
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  loading: boolean = false;

  constructor(private router: Router) {}

  onLogin(): void {
     

    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      if (
        this.email.endsWith('@ucvvirtual.edu.pe') &&
        this.password.length >= 8
      ) {
        console.log('Inicio de sesión exitoso');
        this.loginError = false;
        // Aquí puedes redirigir o mostrar otro componente
      } else {
        this.loginError = true;
      }
    }, 1000);
  }

  goToRegistro(): void {
    this.router.navigate(['/registro']);
  }
}
