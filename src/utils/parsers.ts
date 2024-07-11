export const parseFilterObj = (filters: any) => {
  let filtered = '';
  if (filters) {
    const keys = Object.keys(filters);
    keys.forEach((key) => {
      if (filters[key] !== '') filtered += `&${key}=${filters[key]}`;
    });
  }

  return filtered;
};

export const parseUrlQuery = (url: string, query: any) => {
  const { pagination, searchValue, filters } = query;
  const { pageIndex, pageSize } = pagination;
  const searchQuery = searchValue ? `&query=${searchValue}` : '';

  return `${url}?page=${
    pageIndex + 1
  }&page_size=${pageSize}${searchQuery}${filters}`;
};
