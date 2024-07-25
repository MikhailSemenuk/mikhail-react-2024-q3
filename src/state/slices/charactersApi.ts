import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CharacterPages } from '../../types';

interface GetAllCharactersParams {
  search?: string;
  page?: string;
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<CharacterPages, GetAllCharactersParams>({
      query: ({ search = '', page = '1' }) => `character/?page=${page}&name=${encodeURIComponent(search)}`,
    }),
  }),
});

export const { useGetAllCharactersQuery } = charactersApi;
