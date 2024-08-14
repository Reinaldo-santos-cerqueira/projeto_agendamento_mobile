import {Usuario} from '../user/user';

export interface Agendamento {
  id: string;
  usuario_id: string;
  hora_inicio: string;
  hora_fim: string;
  dia: string;
  mes: string;
  ano: string;
  avaliacao: number;
  data: Date;
}
export interface AgendamentoComUsuario {
  id: string;
  usuario_id: string;
  hora_inicio: string;
  hora_fim: string;
  dia: string;
  mes: string;
  ano: string;
  avaliacao: number;
  data: Date;
  usuario: Usuario;
}

export interface AgendamentoPost {
  usuario_id: string;
  hora_inicio: string;
  hora_fim: string;
  data: string;
  avaliacao: number;
}
