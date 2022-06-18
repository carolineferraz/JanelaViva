import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  textoPesquisa: string;
  postagemCurtida: Postagem;
  postagensCurtidas: Postagem[] = [];

  constructor(
    private router: Router,
    public postagemService: PostagemService,

  ) { }

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/entrar'])
    }
    console.log(environment.token, environment.tipo)
    this.getAllPostagens();

  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe({
      next: (postagens: Postagem[]) => {
        this.postagemService.postagens = this.textoPesquisa.trim().length > 0 ?
          postagens.filter((p) => p.descricao.toLowerCase().indexOf(this.textoPesquisa.trim().toLowerCase()) >= 0) : postagens

        this.textoPesquisa = '';
      },
      error: err => console.log(err)
    })
  }

  pesquisar() {
    this.getAllPostagens();
  }

  ordenaPorData(postagens: Postagem[]) {
    return postagens.sort((p1, p2) => {
      let p1Data = new Date(p1.data).getTime();
      let p2Data = new Date(p2.data).getTime();

      return p2Data - p1Data;
    })
  }

  curtir(id: number) {
    this.postagemCurtida = this.postagemPorId(id) as Postagem;
    this.checaSeCurtiu();

    this.postagemService.putPostagem(this.postagemCurtida).subscribe({
      next: (res: Postagem) => {
        console.log(res);
      },
      error: err => console.log(err),
    });
  }

  postagemPorId(id: number) {
    return this.postagemService.postagens.find(p => p.id === id);
  }

  checaSeCurtiu() {
    if (this.postagensCurtidas.includes(this.postagemCurtida)) {
      if (this.postagemCurtida.curtidas - 1 < 0) {
        this.postagemCurtida.curtidas = 0;
      } else {
        this.postagemCurtida.curtidas--;
      }
      this.postagensCurtidas = this.postagensCurtidas.filter(p => p.id !== this.postagemCurtida.id);
    } else {
      this.postagemCurtida.curtidas++;
      this.postagensCurtidas.push(this.postagemCurtida);
    }
  }

}
