import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value

  }

  typeUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario
    console.log(this.usuario.tipo)

    if (this.usuario.senha != this.confirmarSenha) {
      this.alertasService.showAlertDanger('Senha incorreta!');
    } else {

      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        this.alertasService.showAlertSuccess('Usuário cadastrado com sucesso!')
      })
    }
  }
  checaEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

}
