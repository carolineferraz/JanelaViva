import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  // usuario: Usuario = new Usuario();
  idUsuario = environment.id;
  habilidades: string[] = [];


  constructor(
    private authService: AuthService,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.authService.refreshToken();
    this.findByIdUsuario();

  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe({
      next: (res: Usuario) => {
        this.usuarioService.usuario = res;
        this.habilidades = this.converteTextoEmArray(res.habilidades, ', ');
      },
      error: err => console.log(err)
    })
  }

  converteTextoEmArray(texto: string, separador: string): string[] {
    return texto.split(separador);
  }

}
