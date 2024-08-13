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
  const mesFormat = mes <= 9 ? '0' + mes : mes;
  const diaFormat = dia <= 9 ? '0' + dia : dia;

  const data = ano + '-' + mesFormat + '-' + diaFormat;

  return await AgendamentoApi.getByData(data);
}
