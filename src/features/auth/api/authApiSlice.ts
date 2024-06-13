import { apiSlice } from 'store/api/apiSlice';
import { LoginReturn } from './types';

export const loginApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login/',
        method: 'POST',
        body,
      }),
      transformResponse(res: LoginReturn) {
        return res;
      },
      invalidatesTags: [],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: '/users/',
        method: 'POST',
        body,
      }),
      transformResponse(res) {
        return res;
      },
      invalidatesTags: [],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = loginApiSlice;
