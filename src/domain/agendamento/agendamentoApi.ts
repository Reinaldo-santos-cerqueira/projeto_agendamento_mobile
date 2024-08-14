import {apiAgendamentos} from '@service';
import {
  Agendamento,
  AgendamentoComUsuario,
  AgendamentoPost,
} from './agendamento';
import {getToken} from '@utils';

async function getByData(data: string): Promise<Agendamento[]> {
  const token = await getToken();

  const response = (
    await apiAgendamentos.get('?data=' + data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
  return response;
}

async function getById(id: string): Promise<AgendamentoComUsuario> {
  const token = await getToken();
  const response = (
    await apiAgendamentos.get('/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
  return response;
}
async function getByUserId(): Promise<AgendamentoComUsuario[]> {
  const token = await getToken();

  const response = (
    await apiAgendamentos.get('/usuario/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
  return response;
}

async function updateComparecer(
  confirmado: boolean,
  id: string,
): Promise<Agendamento> {
  const token = await getToken();

  const response = (
    await apiAgendamentos.put(
      '/' + id,
      {confirmado: confirmado},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  ).data;
  return response;
}

async function create(agendamento: AgendamentoPost): Promise<AgendamentoPost> {
  const token = await getToken();

  const response = (
    await apiAgendamentos.post(
      '',
      {...agendamento},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  ).data;
  return response;
}
async function updateAvalicao(
  id: string,
  avaliacao: number,
): Promise<Agendamento> {
  const token = await getToken();

  const response = (
    await apiAgendamentos.put(
      '/' + id,
      {avaliacao},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  ).data;
  return response;
}

export const AgendamentoApi = {
  getByData,
  getById,
  updateComparecer,
  create,
  getByUserId,
  updateAvalicao,
};
