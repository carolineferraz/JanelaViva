import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  usuario: Usuario = new Usuario();

  constructor(
    private http: HttpClient
  ) { }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>('https://janela-viva.herokuapp.com/usuarios/atualizar', usuario, this.token)
  }
}


