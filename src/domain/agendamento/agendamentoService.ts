import {
  Agendamento,
  AgendamentoComUsuario,
  AgendamentoPost,
} from './agendamento';
import {AgendamentoApi} from './agendamentoApi';

interface dataParametro {
  dia: number;
  mes: number;
  ano: number;
}
export const AgendamentoService = {
  getByData,
  getById,
  updateComparecer,
  create,
  getByUserId,
  updateAvaliacao,
};

async function getByData({
  dia,
  mes,
  ano,
}: dataParametro): Promise<Agendamento[]> {
  const mesFormat = mes <= 9 ? '0' + mes : mes;
  const diaFormat = dia <= 9 ? '0' + dia : dia;

  const data = ano + '-' + mesFormat + '-' + diaFormat;

  return await AgendamentoApi.getByData(data);
}

async function getById(id: string): Promise<AgendamentoComUsuario> {
  return await AgendamentoApi.getById(id);
}
async function getByUserId(): Promise<AgendamentoComUsuario[]> {
  return await AgendamentoApi.getByUserId();
}

async function create(agendamento: AgendamentoPost): Promise<AgendamentoPost> {
  return await AgendamentoApi.create(agendamento);
}

async function updateComparecer(
  confirmado: boolean,
  id: string,
): Promise<Agendamento> {
  return await AgendamentoApi.updateComparecer(confirmado, id);
}

async function updateAvaliacao(
  avaliacao: number,
  id: string,
): Promise<Agendamento> {
  return await AgendamentoApi.updateAvalicao(id, avaliacao);
}
