import { Routes } from '@angular/router';
import { Login } from '../login/login';
import { Registro } from '../registro/registro';
import { Chat } from '../chat/chat';
import { PerfilComponent } from '../perfil/perfil.component';


export const routes: Routes = [
  { path: '', component: Login },
  { path: 'registro', component: Registro },
  { path: 'chat', component: Chat },
{ path: 'perfil', component: PerfilComponent },

  { path: '**', redirectTo: '' }
];
