import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil';
import { Chat } from './chat/chat';

export const routes: Routes = [
  { path: 'perfil', component: PerfilComponent},
  { path: 'chat', component: Chat },
  { path: '', redirectTo: 'perfil', pathMatch: 'full' },
  { path: '**', redirectTo: 'perfil' },

  
  

];
