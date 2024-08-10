import {createSlice} from '@reduxjs/toolkit';

interface auth {
  token: string;
}

const initialState: auth = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {saveToken} = authSlice.actions;
export default authSlice.reducer;
