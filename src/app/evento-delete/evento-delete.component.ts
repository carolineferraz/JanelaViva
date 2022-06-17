import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/model/Evento';
import { EventoService } from 'src/app/service/evento.service';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-evento-delete',
  templateUrl: './evento-delete.component.html',
  styleUrls: ['./evento-delete.component.css']
})
export class EventoDeleteComponent implements OnInit {

  evento: Evento = new Evento()
  idEvento: number

  constructor(

    private router: Router,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private alertasService: AlertasService

  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    this.idEvento = this.route.snapshot.params['id']
    this.findByIdEvento(this.idEvento)
  }

  findByIdEvento(id: number) {
    this.eventoService.getByIdEvento(id).subscribe((resp: Evento) => {
      this.evento = resp
    })
  }
  apagar() {
    this.eventoService.deleteEvento(this.idEvento).subscribe(() => {
      this.alertasService.showAlertSuccess('Evento deletado com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
