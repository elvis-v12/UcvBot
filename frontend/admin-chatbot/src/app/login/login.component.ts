import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  isLoading: boolean = false;
  showError: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  login() {
    this.showError = !this.userName || !this.password;
    if (this.showError) return;

    this.isLoading = true;
    // Aquí implementaremos la lógica de login
    setTimeout(() => {
      this.isLoading = false;
      this.message = 'Login exitoso';
      this.messageType = 'success';
    }, 1500);
  }

  addCharacter(char: string) {
    if (this.password.length < 8) {
      this.password += char;
    }
  }

  deleteCharacter() {
    this.password = this.password.slice(0, -1);
  }

  clearInput() {
    this.password = '';
  }

}