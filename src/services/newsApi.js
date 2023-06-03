import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApi_key = '9455b369a5mshc67032426c7ae58p18a224jsn7c886c0c7f28';
const newsApi_host= 'https://bing-news-search1.p.rapidapi.com';

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: newsApi_host,
        prepareHeaders: (headers) => {
            headers.set('X-RapidApi-key', newsApi_key);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ newsCategory, count}) => `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
        }),
    }),
})

export const { useGetNewsQuery} = newsApi;