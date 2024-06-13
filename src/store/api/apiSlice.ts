import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setAuth } from 'features/auth/userSlice';

const noAuthEndpoints: string[] = ['login'];

const dynamicBaseQuery: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = (args, api, extraOptions) => {
  const state = api.getState();
  const baseUrl = state.user.apiUrl;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { endpoint }) => {
      const { token } = state.user;
      if (token && !noAuthEndpoints.includes(endpoint)) {
        headers.set('Authorization', `Token ${token}`);
      } else {
        headers.delete('Authorization');
      }
      return headers;
    },
  });
  return rawBaseQuery(args, api, extraOptions);
};

const execRefreshToken = async (
  args: string | FetchArgs,
  api: BaseQueryApi
) => {
  const { apiUrl, tokens } = api.getState().user;
  const { refresh } = tokens;

  if (refresh === null || refresh === undefined) {
    api.dispatch(logout({}));
    return false;
  }

  const refreshResultRaw = await fetch(`${apiUrl}/auth/refresh/`, {
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ refresh }),
  });

  if (refreshResultRaw.status !== 200) {
    api.dispatch(logout({}));
    return false;
  }

  const refreshResult = await refreshResultRaw.json();
  api.dispatch(
    setAuth({
      tokens: { access: refreshResult.access, refresh },
    })
  );
  return true;
};

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraOptions: any
) => {
  let result = await dynamicBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const isRefreshed = await execRefreshToken(args, api);
    if (isRefreshed) {
      // re submit request
      result = await dynamicBaseQuery(args, api, extraOptions);
      return result;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['room', 'message', 'user'],
  endpoints: () => ({}),
});
