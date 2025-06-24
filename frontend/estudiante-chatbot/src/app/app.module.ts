import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // <--- AÑADIR ESTO

import { AppComponent } from './app.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule // <--- AÑADIR AQUÍ TAMBIÉN
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
