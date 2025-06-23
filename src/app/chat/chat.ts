import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 necesario para ngModel
import { CommonModule } from '@angular/common'; // por si usas *ngIf o *ngFor

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat {
  nombreUsuario = 'Luis';
  avatarIniciales = 'LE';
  buscarTexto = '';
}
