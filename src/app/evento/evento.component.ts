import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Evento } from '../model/Evento';
import { EventoService } from '../service/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  evento: Evento = new Evento()
  listaEventos: Evento[]
  listaEventosUsuario: Evento[];

  constructor(
    private router: Router,
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.findAllEventos()
  }

  findAllEventos() {
    this.eventoService.getAllEventos().subscribe((resp: Evento[]) => {
      this.listaEventos = resp
    })
  }

  cadastrar() {
    console.log(this.evento)
    this.eventoService.postEvento(this.evento).subscribe((resp: Evento) => {
      this.evento = resp
      alert('Tema cadastrado com sucesso!')
      this.findAllEventos()
      this.evento = new Evento()
    })
  }

  checaPostagensDeUsuario() {
    this.listaEventosUsuario = this.listaEventos.filter((e, i) => {
      e.postagens.filter((p, i) => {
        p.usuario.id === environment.id
      })
    })
  }


}
