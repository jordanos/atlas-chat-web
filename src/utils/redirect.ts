import { asidePages, commonPages } from 'routes/menu';

export const redirectRoot = (permissions) => {
  const fallback = commonPages.profile.path;
  const modules = permissions.reduce((acc, cur) => {
    acc.push(cur.module_type);
    return acc;
  }, []);

  const page = Object.values(asidePages).find((item) => {
    return modules.includes(item.module);
  });

  return page ? page.path : fallback;
};
