import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { SobreComponent } from './sobre/sobre.component';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FotoUsuarioComponent } from './foto-usuario/foto-usuario.component';
import { EventoComponent } from './evento/evento.component';
import { EventoDeleteComponent } from './evento-delete/evento-delete.component';
import { EventoEditComponent } from './evento-edit/evento-edit.component';
import { PostagemComponent } from './postagem/postagem.component';
import { PostagemEditComponent } from './postagem-edit/postagem-edit.component';
import { PostagemDeleteComponent } from './postagem-delete/postagem-delete.component';
import { MenuLogadoComponent } from './menu-logado/menu-logado.component';
import { EventoPostagensComponent } from './evento-postagens/evento-postagens.component';
import { UsuarioPostagensComponent } from './usuario-postagens/usuario-postagens.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsuariosComponent } from './usuarios/usuarios.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    SobreComponent,
    InicioComponent,
    NoticiasComponent,
    UsuarioComponent,
    FotoUsuarioComponent,
    EventoComponent,
    EventoDeleteComponent,
    EventoEditComponent,
    PostagemComponent,
    PostagemEditComponent,
    PostagemDeleteComponent,
    MenuLogadoComponent,
    EventoPostagensComponent,
    UsuarioPostagensComponent,
    UsuarioEditComponent,
    AlertasComponent,
    UsuariosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
