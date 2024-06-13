import LazyLoad from 'components/widgets/LazyLoad';
import authRoutes from 'features/auth/routes';
import chatRoutes from 'features/chat/routes';
import { FC, LazyExoticComponent } from 'react';
import { RouteObject } from 'react-router-dom';
import { asidePages, commonPages, innerPages, publicPages } from './menu';

// Get routes from every features/route
// The route key should be as same as the one in menu page.id
const pagesLazyImport: { [key: string]: LazyExoticComponent<FC> } = {
  ...authRoutes,
  ...chatRoutes,
};

export const publicRoutes: RouteObject[] = [
  ...Object.keys(publicPages).map((key) => ({
    path: publicPages[key].path,
    element: LazyLoad({ Component: pagesLazyImport[key] }),
  })),
];

export const protectedRoutes: RouteObject[] = [
  ...Object.keys(asidePages).map((key) => ({
    path: asidePages[key].path,
    element: LazyLoad({ Component: pagesLazyImport[key] }),
  })),
  ...Object.keys(innerPages).map((key) => ({
    path: innerPages[key].path,
    element: LazyLoad({ Component: pagesLazyImport[key] }),
  })),
  ...Object.keys(commonPages).map((key) => ({
    path: commonPages[key].path,
    element: LazyLoad({ Component: pagesLazyImport[key] }),
  })),
];
