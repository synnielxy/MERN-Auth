import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  reducerPath: 'userAPI',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});

const apiKey = '14ef3216dcb9a693d84d4554b570985b';
const tmdbApiBaseQuery = fetchBaseQuery({
  baseUrl: 'https://api.themoviedb.org/3',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

export const apiSlice2 = createApi({
  reducerPath: 'tmdbAPI',
  baseQuery: async (args, api, extraOptions) => {
    if (typeof args === 'string') {
      args += args.includes('?') ? `&api_key=${apiKey}` : `?api_key=${apiKey}`;
    } else if ('url' in args) {
      args.url += args.includes('?') ? `&api_key=${apiKey}` : `?api_key=${apiKey}`;
    }
    return tmdbApiBaseQuery(args, api, extraOptions);
  },
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});