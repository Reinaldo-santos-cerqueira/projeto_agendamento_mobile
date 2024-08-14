import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
  logged: boolean;
  token: string;
  tipo: 'P' | 'F' | '';
}

const initialState: LoginState = {
  logged: false,
  token: '',
  tipo: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{token: string; tipo: 'P' | 'F'}>) => {
      state.logged = true;
      state.token = action.payload.token;
      state.tipo = action.payload.tipo;
    },
    logout: state => {
      state.logged = false;
      state.token = '';
      state.tipo = '';
    },
  },
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;
