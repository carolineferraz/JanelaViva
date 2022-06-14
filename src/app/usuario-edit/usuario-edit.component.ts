import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
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
    private alertasService: AlertasService
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
        this.usuario.senha = ''
      },
      error: err => console.log(err)
    })

  }

  confirmSenha(e: any) {
    this.confirmarSenh = e.target.value;
  }

  atualizar() {
    this.usuario.tipo = environment.tipo

    if (this.usuario.senha != this.confirmarSenh) {
      this.alertasService.showAlertDanger('Senha incorreta!')
    } else {
      console.log(this.usuario)
      this.usuarioService.putUsuario(this.usuario).subscribe({
        next: (res: Usuario) => {
          this.usuario = res;
          this.usuarioLogin.usuario = this.usuario.email;
          this.usuarioLogin.senha = this.confirmarSenh;

          console.log('Depois: ' + this.usuario)
          environment.token = '';
          environment.id = 0;
          environment.avaliacao = 0;
          environment.nome = '';
          environment.foto = '';
          environment.tipo = '';
          environment.habilidades = '';
          this.router.navigate(['/entrar'])
          this.alertasService.showAlertSuccess('Usuário atualizado com sucesso! Entre novamente.')
        },
        error: err => console.log(err)
      })

    }
  }
}
