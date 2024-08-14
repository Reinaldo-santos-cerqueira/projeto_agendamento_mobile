import {api, apiUsuarios} from '@service';
import {Usuario, UsuarioAuth, UsuarioLogin} from './user';
import {getToken} from '@utils';

async function login(usuarioAuth: UsuarioAuth): Promise<UsuarioLogin> {
  const response = (await api.post('/login', {...usuarioAuth})).data;
  return response;
}

async function getAll(): Promise<Usuario[]> {
  const token = await getToken();

  const response = (
    await apiUsuarios.get('/pacientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
  return response;
}
export const userApi = {
  login,
  getAll,
};
