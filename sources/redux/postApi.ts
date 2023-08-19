import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Comment, Post } from './types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://my-json-server.typicode.com/Omelyan/posts-exam19/',
  }),
  tagTypes: ['Post', 'Comment'],
  endpoints: build => ({
    // Queries
    getPosts: build.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    getComments: build.query<Comment[], number>({
      query: _postId => 'comments?postId=1',
      providesTags: (result, error, postId) => [{ type: 'Comment', postId }],
    }),

    // Mutations
    createPost: build.mutation<Post, Omit<Post, 'id'>>({
      query: body => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getPosts', undefined, posts => {
              posts.unshift({ ...data, id: new Date().getTime() });
            }),
          );
        } catch {
          //
        }
      },
    }),

    updatePost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: ({ id: _id, ...body }) => ({
        url: 'posts/1',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getPosts', undefined, posts => {
              const index = posts.findIndex(current => current.id === body.id);
              if (index < 0) throw new Error('Unable to find post.');
              posts[index] = { ...data, ...body };
            }),
          );
        } catch {
          //
        }
      },
    }),

    removePost: build.mutation<void, number>({
      query: _id => ({
        url: 'posts/1',
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getPosts', undefined, posts => {
              const index = posts.findIndex(current => current.id === id);
              if (index < 0) throw new Error('Unable to find post.');
              posts.splice(index, 1);
            }),
          );
        } catch {
          //
        }
      },
    }),

    createComment: build.mutation<Comment, Omit<Comment, 'id'>>({
      query: body => ({
        url: 'comments',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getComments', data.postId, comments => {
              comments.push({ ...data, id: new Date().getTime() });
            }),
          );
        } catch {
          //
        }
      },
    }),

    updateComment: build.mutation<void, Comment>({
      query: _data => ({
        url: 'comments', // `comments/${_data.id}`
        method: 'GET', // POST
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const { id, postId } = data;

        try {
          await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getComments', postId, comments => {
              const index = comments.findIndex(current => current.id === id);
              if (index < 0) throw new Error('Unable to find comment.');
              comments.splice(index, 1, data);
            }),
          );
        } catch {
          //
        }
      },
    }),

    removeComment: build.mutation<void, Comment>({
      query: _data => ({
        url: 'comments', // `comments/${_data.id}`
        method: 'GET', // REMOVE
      }),
      async onQueryStarted({ id, postId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getComments', postId, comments => {
              const index = comments.findIndex(current => current.id === id);
              if (index < 0) throw new Error('Unable to find comment.');
              comments.splice(index, 1);
            }),
          );
        } catch {
          //
        }
      },
    }),
  }),
});

export default api;

export const {
  useGetPostsQuery,
  useGetCommentsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
} = api;
