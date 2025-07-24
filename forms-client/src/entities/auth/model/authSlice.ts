import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@/entities/auth/api';
import type { User } from '@/entities/user';
import type { LoginDto } from './auth';

interface AuthState {
  currentUser: User | null;
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: false,
  isAuth: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (body: LoginDto) => {
    await api.loginUser(body);
    return await api.getCurrentProfile();
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await api.logoutUser();
  }
);

export const getMe = createAsyncThunk(
  'auth/getMe',
  async () => {
    return await api.getCurrentProfile();
  }
);

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })

  
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuth = false;
      })


      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(getMe.rejected, (state) => {
        state.currentUser = null;
        state.isAuth = false;
        state.isLoading = false;
      });
  },
});

export default AuthSlice.reducer;
