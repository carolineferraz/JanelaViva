import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Evento } from '../model/Evento';
import { Postagem } from '../model/Postagem';
import { EventoService } from '../service/evento.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  evento: Evento = new Evento()
  listaEventos: Evento[]
  idEvento: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private eventoService: EventoService

  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/postagem'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    // this.findAllEventos()
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }
  // findAllEventos(){
  //   this.eventoService.getAllEventos().subscribe((resp: Evento[])=>{
  //     this.listaEventos=resp
  //   })
  // }
  atualizar() {

    this.postagem.evento = this.postagem.evento

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem atualizada com sucesso!')

      this.router.navigate(['/usuario-postagens'])
    })
  }
  // findByIdEvento(){
  //   this.eventoService.getByIdEvento(this.idEvento).subscribe((resp:Evento)=>{
  //     this.evento=resp
  //   })
  // }

}
