import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IaService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  enviarPregunta(pregunta: string, user_uid: string, session_id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pregunta`, {
      prompt: pregunta,
      user_uid,
      session_id
    });
  }

  crearSesion(data: { session_id: string, student_id: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sesion`, data);
  }

  obtenerMensajes(session_id: string, user_uid: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/historial/${session_id}/${user_uid}`);
  }
  obtenerSesiones(student_id: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/sesiones/${student_id}`);
}

}
