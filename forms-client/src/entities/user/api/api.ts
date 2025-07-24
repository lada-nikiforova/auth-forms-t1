import type { User, UserCreateDto, UserPatchDto } from "../model";

const BASE_URL = '/api/v1'; 

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`, {
    headers: {
        'content-type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to get users');
  const data = await response.json();
  return data;
};

export const createUser = async (body: UserCreateDto): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('Failed to create user');
    const data = await response.json();
    return data;
};

export const getUserById = async (id: string): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to get user by id');
    const data = await response.json();
    return data;
};

export const updateUser = async (body: UserPatchDto): Promise<void> => {
    const { id, ...fields } = body;
    const response = await fetch(`${BASE_URL}/users/${body.id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(fields),
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to update user');
    return;
};

export const deleteUser = async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return;
};

