import { asidePages, commonPages, innerPages } from 'routes/menu';
import { RouteObject } from 'react-router-dom';
import DefaultHeader from 'components/layout/header/DefaultHeader';

export const asideHeaders: RouteObject[] = [
  ...Object.values(asidePages).map((item) => ({
    path: item.path,
    element: <DefaultHeader title={item.text} />,
  })),
  ...Object.values(innerPages).map((item) => ({
    path: item.path,
    element: <DefaultHeader title={item.text} />,
  })),
  ...Object.values(commonPages).map((item) => ({
    path: item.path,
    element: <DefaultHeader title={item.text} />,
  })),
];
