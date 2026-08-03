import { cookies } from 'next/headers';
import type { AxiosResponse } from 'axios';

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

interface SessionResponse {
  success: boolean;
}

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
};

export const checkSession = async (): Promise<
  AxiosResponse<SessionResponse>
> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<SessionResponse>('auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response;
};

export const getCurrentUser = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await api.get<User>('users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await api.get<FetchNotesResponse>('notes', {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag ? { tag } : {}),
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};

export const fetchNoteById = async (
  id: string,
): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await api.get<Note>(`notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};