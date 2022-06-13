import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioLogin: UsuarioLogin = new UsuarioLogin();
  idUsuario = environment.id;
  confirmarSenh: string;


  constructor(private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/entrar'])
    }

    this.authService.refreshToken();
    this.idUsuario = environment.id;

    this.findByIdUsuario(this.idUsuario);
  }

  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe({
      next: (res: Usuario) => {
        this.usuario = res;
        console.log(this.usuario)
      },
      error: err => console.log(err)
    })
  }

  confirmSenha(e: any) {
    this.confirmarSenh = e.target.value;
  }

  atualizar() {
    this.usuario.tipo = environment.tipo
    console.log('Antes: ' + this.usuario)
    if (this.usuario.senha != this.confirmarSenh) {
      alert('Senha incorreta!')
    } else {
      this.usuarioService.putUsuario(this.usuario).subscribe({
        next: (res: Usuario) => {
          this.usuario = res;
          this.usuarioLogin.usuario = this.usuario.email;
          this.usuarioLogin.senha = this.confirmarSenh;

          console.log('Depois: ' + this.usuario)

          this.authService.entrar(this.usuarioLogin).subscribe({
            next: (res: UsuarioLogin) => {
              this.usuarioLogin = res;
              environment.token = this.usuarioLogin.token;
              environment.id = this.usuarioLogin.id;
              environment.nome = this.usuarioLogin.nome;
              environment.avaliacao = this.usuarioLogin.avaliacao;
              environment.habilidades = this.usuarioLogin.habilidades;
              this.usuarioService.usuario = this.usuario;
              alert('Usuário atualizado com sucesso!')
              this.router.navigate(['/inicio'])
            },
            error: err => console.log(err)
          })
        },
        error: err => console.log(err)
      })

    }
  }
}
