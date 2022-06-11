import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-foto-usuario',
  templateUrl: './foto-usuario.component.html',
  styleUrls: ['./foto-usuario.component.css']
})
export class FotoUsuarioComponent implements OnInit {

  foto: string = environment.foto;

  constructor() { }

  ngOnInit(): void {
  }

}
