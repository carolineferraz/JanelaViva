import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http: HttpClient
  ) { }

  token={
    headers:new HttpHeaders().set('Authorization',environment.token)
  }

  getAllEventos():Observable<Evento[]>{
    return this.http.get<Evento[]>('https://janelaviva.herokuapp.com/eventos', this.token)    
  }
  getByIdEvento(id: number):Observable<Evento>{
      return this.http.get<Evento>(`https://janelaviva.herokuapp.com/eventos/${id}`, this.token) 
  }
  postEvento(evento: Evento):Observable<Evento>{
    return this.http.post<Evento>('https://janelaviva.herokuapp.com/eventos',evento, this.token) 
  }
  putEvento(evento: Evento):Observable<Evento>{
    return this.http.put<Evento>('https://janelaviva.herokuapp.com/eventos',evento, this.token) 
  }
  deleteEvento(id: number){
    return this.http.delete(`https://janelaviva.herokuapp.com/eventos/${id}`, this.token) 
  }
}
