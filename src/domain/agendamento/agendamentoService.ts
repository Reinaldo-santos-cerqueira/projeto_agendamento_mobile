import {Agendamento} from './agendamento';
import {AgendamentoApi} from './agendamentoApi';

interface dataParametro {
  dia: number;
  mes: number;
  ano: number;
}
export const AgendamentoService = {
  getByData,
};

async function getByData({
  dia,
  mes,
  ano,
}: dataParametro): Promise<Agendamento[]> {
  const mesFormat = mes <= 9 ? '0' + (mes + 1) : mes + 1;
  const diaFormat = dia <= 9 ? '0' + dia : dia;

  const data = ano + '-' + mesFormat + '-' + diaFormat;
  const response = await AgendamentoApi.getByData(data);
  console.log('response', response);
  return await AgendamentoApi.getByData(data);
}
