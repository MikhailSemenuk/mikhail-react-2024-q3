import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, InfoResults } from '../../types';

export interface GetAllCharactersParams {
  search?: string;
  page?: string;
}

export interface getCharacterParams {
  id: string;
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<InfoResults, GetAllCharactersParams>({
      query: ({ search = '', page = '1' }) => `character/?page=${page}&name=${encodeURIComponent(search)}`,
    }),
    getCharacter: builder.query<Character, getCharacterParams>({
      query: ({ id }) => `character/${id}`,
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharacterQuery } = charactersApi;
