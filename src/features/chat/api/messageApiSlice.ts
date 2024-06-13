import { apiSlice } from 'store/api/apiSlice';
import { parseUrlQuery } from 'utils/parsers';
import { MessageModel } from '../models';

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (q) => parseUrlQuery('/messages/', q),
      transformResponse(res) {
        const results = res.results.map((item) => {
          return MessageModel.fromApiResponse(item);
        });

        return { ...res, results };
      },
      providesTags: ['message'],
    }),
  }),
});

export const { useGetMessagesQuery } = messageApiSlice;
