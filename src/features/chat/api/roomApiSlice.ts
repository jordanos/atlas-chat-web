import { UserModel } from 'features/auth/models';
import { apiSlice } from 'store/api/apiSlice';
import { parseUrlQuery } from 'utils/parsers';
import { RoomModel } from '../models';

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: (q) => parseUrlQuery('/messages/rooms/', q),
      transformResponse(res: object) {
        const results = res.results.map((item) => {
          return RoomModel.fromApiResponse(item);
        });

        return { ...res, results };
      },
      providesTags: ['room'],
    }),
    getRoomUsers: builder.query({
      query: (q) => {
        return parseUrlQuery(`/messages/rooms/${q.path.room_id}/users/`, q);
      },
      transformResponse(res: object) {
        const results = res.results.map((item) => {
          return UserModel.fromApiResponse(item);
        });

        return { ...res, results };
      },
      providesTags: ['user'],
    }),
    getRoom: builder.query({
      query: (room_id) => `/messages/rooms/${room_id}`,
      transformResponse(res) {
        const room = RoomModel.fromApiResponse(res);
        return room;
      },
      providesTags: ['room'],
    }),
    createRoom: builder.mutation({
      query: (body) => ({
        url: '/messages/rooms/',
        method: 'POST',
        body,
      }),
      transformResponse(res) {
        return res;
      },
      invalidatesTags: ['room'],
    }),
    addUserToRoom: builder.mutation({
      query: (body) => ({
        url: `/messages/rooms/${body.room_id}/add-user/`,
        method: 'POST',
        body,
      }),
      transformResponse(res) {
        return res;
      },
      invalidatesTags: ['user'],
    }),
    joinPrivateRoom: builder.mutation({
      query: (body) => ({
        url: '/messages/rooms/join-private/',
        method: 'POST',
        body,
      }),
      transformResponse(res) {
        return res;
      },
      invalidatesTags: ['room'],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomUsersQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useAddUserToRoomMutation,
  useJoinPrivateRoomMutation,
} = roomApiSlice;
