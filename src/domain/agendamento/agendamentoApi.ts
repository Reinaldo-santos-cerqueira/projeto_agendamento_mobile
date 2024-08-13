import {apiAgendamentos} from '@service';
import {Agendamento} from './agendamento';

async function getByData(data: string): Promise<Agendamento[]> {
  const response = (await apiAgendamentos.get('?data=' + data)).data;
  console.log('?data=' + data);
  return response;
}
export const AgendamentoApi = {
  getByData,
};
