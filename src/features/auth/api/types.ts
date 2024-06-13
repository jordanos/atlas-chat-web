export type LoginReturn = {
  tokens: { access: string; refresh: string };
  tenant: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};
