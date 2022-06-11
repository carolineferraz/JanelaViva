import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Evento } from '../model/Evento';
import { Postagem } from '../model/Postagem';
import { EventoService } from '../service/evento.service';

@Component({
  selector: 'app-evento-postagens',
  templateUrl: './evento-postagens.component.html',
  styleUrls: ['./evento-postagens.component.css']
})
export class EventoPostagensComponent implements OnInit {

  idEvento: number;
  evento: Evento;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventoService: EventoService,
  ) { }

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/entrar'])
    }

    this.idEvento = this.route.snapshot.params['id']
    this.postagensPorIdEvento(this.idEvento);
  }

  postagensPorIdEvento(id: number) {

    this.eventoService.getByIdEvento(id).subscribe({
      next: (res: Evento) => {
        this.evento = res;
      },
      error: err => console.log(err)
    })
  }

}
