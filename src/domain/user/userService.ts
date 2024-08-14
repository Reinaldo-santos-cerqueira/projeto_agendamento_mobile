import {Usuario, UsuarioAuth, UsuarioLogin} from './user';
import {userApi} from './userApi';

async function login(usuario: UsuarioAuth): Promise<UsuarioLogin> {
  const usuarioList = await userApi.login(usuario);
  return usuarioList;
}
async function getAll(): Promise<Usuario[]> {
  return await userApi.getAll();
}
export const usuarioService = {
  login,
  getAll,
};
