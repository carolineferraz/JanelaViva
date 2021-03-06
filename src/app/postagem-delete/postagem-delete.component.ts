import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPostagem: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alertasService: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idPostagem = this.route.snapshot.params['id']
    console.log(this.idPostagem)
    this.findByIdPostagem(this.idPostagem)
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })

  }
  apagar() {
    console.log(this.postagem)
    this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
      this.alertasService.showAlertSuccess('Postagem apagada com sucesso!')
      this.router.navigate(['/usuario-postagens'])
    })
  }

}
