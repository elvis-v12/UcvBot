import { Routes } from '@angular/router';
import { Login } from '../login/login';
import { Registro } from '../registro/registro'; // Importa el componente Registro

export const routes: Routes = [
  { path: '', component: Login },              // Página principal: Login
  { path: 'registro', component: Registro },   // Ruta para el registro
  { path: '**', redirectTo: '' }               // Redirección en caso de rutas desconocidas
];
