import { useState } from 'react';
import { PAGE_SIZE, PAGE_START } from 'constants/pagination';

export const usePagination = ({
  pageIndex = PAGE_START,
  pageSize = PAGE_SIZE,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize,
  });

  return [pagination, setPagination];
};
