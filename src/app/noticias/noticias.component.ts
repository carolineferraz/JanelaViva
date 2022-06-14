import { Component, OnInit } from '@angular/core';
import { Evento } from '../model/Evento';
import { EventoService } from '../service/evento.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  constructor(
    public eventoService: EventoService
  ) { }

  ngOnInit(): void {
    this.findAllEventos();
  }

  findAllEventos() {
    this.eventoService.getAllEventos().subscribe({
      next: (res: Evento[]) => {
        this.eventoService.eventos = res;

      },
      error: err => console.log(err)
    })
  }

  ordenaPorData(eventos: Evento[]) {
    return eventos.sort((e1, e2) => {
      let e1Data = new Date(e1.data).getTime();
      let e2Data = new Date(e2.data).getTime();

      return e2Data - e1Data;
    })
  }

}
