import { Evento } from "./Evento";
import { Usuario } from "./Usuario";

export class Postagem {
  id: number;
  descricao: string;
  foto: string;
  curtidas: number;
  evento: Evento;
  usuario: Usuario;
  data: Date;
}
