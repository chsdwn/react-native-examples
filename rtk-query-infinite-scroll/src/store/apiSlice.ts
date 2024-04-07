import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type IPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type IPostQuery = {
  start: number;
  limit: number;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['POST'],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], IPostQuery>({
      query: ({ limit, start }) => `/posts?_start=${start}&_limit=${limit}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg: { start } }) => {
        if (start === 0) currentCache.length = 0;
        currentCache.push(...newItems);
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      providesTags: (result) =>
        result
          ? [
              ...result.map((post) => ({ type: 'POST' as const, id: post.id })),
              'POST',
            ]
          : ['POST'],
    }),
  }),
});

export const { useGetPostsQuery } = apiSlice;
