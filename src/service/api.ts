import axios from 'axios';

export const apiAgendamentos = axios.create({
  baseURL: 'http://10.0.2.2:8000/api/agendamentos',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const apiUsuarios = axios.create({
  baseURL: 'http://10.0.2.2:8000/api/users',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
