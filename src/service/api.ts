import axios from 'axios';

export const apiAgendamentos = axios.create({
  baseURL: 'http://10.0.2.2:8000/api/agendamentos',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 6|McTW5nbSy79nlo7BK1IECFp7jHJOBOXdIF45Npy1685f8bb8',
    Accept: 'application/json',
  },
});
