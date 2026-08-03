import type { Note } from '@/types/note';
import type { User } from '@/types/user';

import { api } from './api';

export interface FetchNotesParams {
  page: number;
  search: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface UpdateUserData {
  username: string;
}

interface SessionResponse {
  success: boolean;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('notes', {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag ? { tag } : {}),
    },
  });

  return response.data;
};

export const fetchNoteById = async (
  id: string,
): Promise<Note> => {
  const response = await api.get<Note>(`notes/${id}`);

  return response.data;
};

export const createNote = async (
  note: NewNote,
): Promise<Note> => {
  const response = await api.post<Note>('notes', note);

  return response.data;
};

export const deleteNote = async (
  id: string,
): Promise<Note> => {
  const response = await api.delete<Note>(`notes/${id}`);

  return response.data;
};

export const register = async (
  credentials: AuthCredentials,
): Promise<User> => {
  const response = await api.post<User>(
    'auth/register',
    credentials,
  );

  return response.data;
};

export const login = async (
  credentials: AuthCredentials,
): Promise<User> => {
  const response = await api.post<User>(
    'auth/login',
    credentials,
  );

  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  const response = await api.get<SessionResponse>(
    'auth/session',
  );

  return response.data.success;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>(
    'users/me',
  );

  return response.data;
};

export const updateMe = async (
  userData: UpdateUserData,
): Promise<User> => {
  const response = await api.patch<User>(
    'users/me',
    userData,
  );

  return response.data;
};