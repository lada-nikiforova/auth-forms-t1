import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '@/entities/user/api/api';
import type { User, UserCreateDto, UserPatchDto } from './user';

interface UserState {
  users: User[],
  isLoading: boolean,
}

const initialState: UserState = {
  users: [],
  isLoading: false,
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  api.getAllUsers
);

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (body: UserCreateDto) => api.createUser(body)
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ( body: UserPatchDto) => api.updateUser(body)
);

export const deleteUserAsync = createAsyncThunk(
  'user/deleteUser',
  async (id: string) => api.deleteUser(id)
);

export const getUserByIdAsync = createAsyncThunk(
  'user/getUserById',
  async (id: string) => api.getUserById(id)
);

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        const found = state.users.find(u => u.id === action.payload.id);
        if (!found) {
          state.users.push(action.payload);
        }
      })

      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        const id = action.meta.arg;
        state.users = state.users.filter(u => u.id !== id);
      });
  },
});

export default UserSlice.reducer;
