import { PermissionsType } from '../types';

export type LoginReturn = {
  tokens: { access: string; refresh: string };
  tenant: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  permissions: PermissionsType;
};
