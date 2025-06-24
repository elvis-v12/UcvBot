import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil';
import { Chat } from './chat/chat';
import { Login } from './login/login';
import { Registro } from './registro/registro';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'perfil', component: PerfilComponent },
  { path: 'chat', component: Chat },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }

  
  

];
