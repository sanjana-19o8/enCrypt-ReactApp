import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const api_key= process.env.REACT_APP_RAPIDAPI_KEY;
const api_host= process.env.REACT_APP_CRYPTO_API_HOST;

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: api_host,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', api_key)
      return headers;
    } }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => `/coin/${coinId}`,
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timeperiod }) => `coin/${coinId}/history?timeperiod=${timeperiod}`,
    }),
    getExchanges: builder.query({
      query: () => '/exchanges',
    }),
  }),
})

export const { useGetExchangesQuery, useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCoinHistoryQuery } = cryptoApi;