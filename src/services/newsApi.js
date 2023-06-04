import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApi_key = process.env.REACT_APP_RAPIDAPI_KEY;
const newsApi_host= process.env.REACT_APP_NEWS_API_HOST;

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