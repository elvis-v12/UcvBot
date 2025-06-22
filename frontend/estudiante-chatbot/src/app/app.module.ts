import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PerfilComponent } from '../perfil/perfil.component'; // Ajusta la ruta si es diferente
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
