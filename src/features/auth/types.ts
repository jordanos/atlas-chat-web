export type User = {
  id: number;
  username: string;
  role: string;
  isAuth: boolean;
  token: string | null;
  theme: 'dark' | 'light';
  lang: string;
  apiUrl: string;
};
