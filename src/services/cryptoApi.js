import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const api_key= '9455b369a5mshc67032426c7ae58p18a224jsn7c886c0c7f28';
const api_host= 'https://coinranking1.p.rapidapi.com';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://coinranking1.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', api_key)
      return headers;
    } }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),
    }),
})

export const { useGetCryptosQuery } = cryptoApi;