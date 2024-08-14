export interface Usuario {
  id: string;
  nome: string;
  identificador: string;
  senha: string;
  tipo: 'P' | 'F';
}

export interface UsuarioAuth {
  identificador: string;
  senha: string;
}

export interface UsuarioLogin {
  message: string;
  token: string;
  user: Usuario;
}
