/* eslint-disable @typescript-eslint/no-unused-vars */
import {Usuario, UsuarioAuth} from './user';

async function login({senha, identificador}: UsuarioAuth): Promise<boolean> {
  await new Promise(resolve =>
    setTimeout(() => {
      resolve('');
    }, 1000),
  );
  return true;
}

export const userApi = {
  login,
};
