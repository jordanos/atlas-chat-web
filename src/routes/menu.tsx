import { PagesType } from './types';

export const asidePages: PagesType = {
  chat: {
    id: 'chat',
    text: 'Chat',
    path: '/',
  },
};
export const innerPages: PagesType = {};

export const commonPages: PagesType = {};

export const publicPages: PagesType = {
  register: {
    id: 'register',
    text: 'Register',
    path: '/auth/register',
  },
  login: {
    id: 'login',
    text: 'Login',
    path: '/auth/login',
  },
};

export const page404: PagesType = {};

// Apply route guarding for inner pages too
export const noAccessReq = [
  ...Object.values(commonPages).map((item) => item.path),
  ...Object.values(innerPages).map((item) => item.path),
];

export const noAsidePages = [
  ...Object.values(publicPages).map((item) => item.path),
];
