import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Evento } from '../model/Evento';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { EventoService } from '../service/evento.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  evento: Evento = new Evento()
  listaEventos: Evento[]
  idEvento: number

  usuario: Usuario = new Usuario()
  usuarioPost: Usuario = new Usuario()

  idUsuario = environment.id



  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private eventoService: EventoService,
    private authService: AuthService,
    private alertasService: AlertasService
  ) { }


  ngOnInit() {

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.authService.refreshToken()
    this.getAllEventos()
    this.getAllPostagens()


  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.postagemService.postagens = resp;
    })
  }


  getAllEventos() {
    this.eventoService.getAllEventos().subscribe((resp: Evento[]) => {
      this.listaEventos = resp
    })
  }

  findByIdEvento() {
    console.log(this.idEvento)
    this.eventoService.getByIdEvento(this.idEvento).subscribe((resp: Evento) => {
      this.evento = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {

      this.usuario = resp
    })
  }

  publicar() {
    console.log()

    this.evento.postagens = []

    this.evento.id = this.idEvento
    this.postagem.evento = this.evento

    this.usuarioPost.id = this.idUsuario
    this.postagem.usuario = this.usuarioPost

    console.log(this.postagem)

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {

      this.postagem = resp
      this.alertasService.showAlertSuccess('Postagem realizado com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
