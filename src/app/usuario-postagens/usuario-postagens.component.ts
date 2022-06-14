import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-usuario-postagens',
  templateUrl: './usuario-postagens.component.html',
  styleUrls: ['./usuario-postagens.component.css']
})
export class UsuarioPostagensComponent implements OnInit {

  postagens: Postagem[];
  nomeUsuario: string = environment.nome;

  constructor(private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/entrar'])
    }

    this.postagensPorUsuario();
  }

  postagensPorUsuario() {
    this.postagemService.getAllPostagens().subscribe({
      next: (postagens: Postagem[]) => {
        this.postagens = postagens.sort((a, b) => b.id - a.id).filter((p) => p.usuario.id == environment.id)
      },
      error: err => console.log(err)
    })
  }





}
