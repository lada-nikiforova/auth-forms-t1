import type { User } from "@/entities/user";
import type { LoginDto } from "../model";

const BASE_URL = '/api/v1/auth'; 

export const loginUser = async (body: LoginDto): Promise<void> => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed login user');
    await response.json();
};

export const logoutUser = async (): Promise<void> => {
    const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed logout user');
    await response.json();
};

export const getCurrentProfile = async (): Promise<User> => {
    const response = await fetch(`${BASE_URL}/me`, {
      headers: {
          'content-type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to get profile');
    return await response.json();
};