import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InfoResults } from '../../types';

export interface GetAllCharactersParams {
  search?: string;
  page?: string;
}

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<InfoResults, GetAllCharactersParams>({
      query: ({ search = '', page = '1' }) => `character/?page=${page}&name=${encodeURIComponent(search)}`,
    }),
  }),
});

export const { useGetAllCharactersQuery } = charactersApi;
