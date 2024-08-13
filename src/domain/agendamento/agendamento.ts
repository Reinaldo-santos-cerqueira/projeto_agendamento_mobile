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
