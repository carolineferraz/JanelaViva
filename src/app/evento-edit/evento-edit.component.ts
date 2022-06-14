import { Evento } from 'src/app/model/Evento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from 'src/app/service/evento.service';
import { window } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css']
})
export class EventoEditComponent implements OnInit {

  evento: Evento = new Evento()

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertasService: AlertasService

  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']

    this.findByIdEvento(id)


  }

  findByIdEvento(id: number) {
    this.eventoService.getByIdEvento(id).subscribe((resp: Evento) => {
      this.evento = resp
    })
  }

  getAllEventos() {
    this.eventoService.getAllEventos().subscribe((resp: Evento[]) => {
      this.eventoService.eventos = resp;
    })
  }

  atualizar() {
    this.evento.postagens = [];
    this.eventoService.putEvento(this.evento).subscribe({
      next: (res: Evento) => {
        this.evento = res;
        console.log(res)
        this.alertasService.showAlertSuccess('Evento atualizado com sucesso!')
        this.getAllEventos()
        this.router.navigate(['/inicio'])
      },
      error: err => console.log(err)
    })
  }



}
