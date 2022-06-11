import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router,
    public postagemService: PostagemService,
  ) { }

  ngOnInit(): void {
    // if (environment.token === '') {
    //   this.router.navigate(['/entrar'])
    // }

    this.getAllPostagens();

  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe({
      next: (postagens: Postagem[]) => {
        this.postagemService.postagens = postagens
      },
      error: err => console.log(err)
    })
  }

}
