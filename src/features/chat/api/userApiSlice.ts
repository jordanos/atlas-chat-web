import { UserModel } from 'features/auth/models';
import { apiSlice } from 'store/api/apiSlice';
import { parseUrlQuery } from 'utils/parsers';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (q) => parseUrlQuery('/users/', q),
      transformResponse(res) {
        const results = res.results.map((item) => {
          return UserModel.fromApiResponse(item);
        });

        return { ...res, results };
      },
      providesTags: ['user'],
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;
