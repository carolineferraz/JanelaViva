import { Evento } from "./Evento";
import { Usuario } from "./Usuario";

export class Postagem {
  public id: number;
  public descricao: string;
  public curtidas: number;
  public evento: Evento;
  public usuario: Usuario;
}
