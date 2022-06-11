import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { EventoDeleteComponent } from './evento-delete/evento-delete.component';
import { EventoEditComponent } from './evento-edit/evento-edit.component';
import { EventoPostagensComponent } from './evento-postagens/evento-postagens.component';
import { EventoComponent } from './evento/evento.component';
import { InicioComponent } from './inicio/inicio.component';
import { PostagemDeleteComponent } from './postagem-delete/postagem-delete.component';
import { PostagemEditComponent } from './postagem-edit/postagem-edit.component';
import { PostagemComponent } from './postagem/postagem.component';
import { SobreComponent } from './sobre/sobre.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioPostagensComponent } from './usuario-postagens/usuario-postagens.component';

const routes: Routes = [
  { path: '', redirectTo: 'entrar', pathMatch: 'full' },
  { path: 'entrar', component: EntrarComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'evento', component: EventoComponent },
  { path: 'evento-delete/:id', component: EventoDeleteComponent },
  { path: 'evento-edit/:id', component: EventoEditComponent },
  { path: 'evento-postagens/:id', component: EventoPostagensComponent },
  { path: 'postagem', component: PostagemComponent },
  { path: 'postagem-edit/:id', component: PostagemEditComponent },
  { path: 'postagem-delete/:id', component: PostagemDeleteComponent },
  { path: 'usuario-postagens', component: UsuarioPostagensComponent },
  { path: 'usuario-edit/:id', component: UsuarioEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
