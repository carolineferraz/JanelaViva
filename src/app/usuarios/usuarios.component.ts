import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  tipoUsuario: string = '';

  usuarios: Usuario[] = [];
  imgPlaceholder = 'https://www.prescriptum.com.br/wp-content/uploads/2015/12/placeholder-usuario-500x500.jpg'

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/entrar'])
    }


    this.tipoUsuario = environment.tipo;
    this.getAllUsuarios();

  }

  getAllUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: ((res: Usuario[]) => {
        this.usuarios = res;
      }),
      error: err => console.log(err)
    })
  }

  checaStrImg(imgUrl: string) {
    const imgRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

    return imgRegex.test(imgUrl);
  }
}
