import {UsuarioAuth} from './user';
import {userApi} from './userApi';

async function login(usuario: UsuarioAuth): Promise<Boolean> {
  const usuarioList = await userApi.login(usuario);
  return usuarioList;
}

export const usuarioService = {
  login,
};
