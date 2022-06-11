import { Evento } from 'src/app/model/Evento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from 'src/app/service/evento.service';
import { window } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

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
    private route: ActivatedRoute

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

  atualizar() {
    this.eventoService.putEvento(this.evento).subscribe((resp: Evento) => {
      this.evento = resp
      alert('Evento atualizado!')
      this.router.navigate(['/evento'])
    })
  }



}
