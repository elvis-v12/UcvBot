import { Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil';

export const routes: Routes = [
  { path: 'perfil', component: PerfilComponent},
  { path: '', redirectTo: 'perfil', pathMatch: 'full' },
  { path: '**', redirectTo: 'perfil' }

];
