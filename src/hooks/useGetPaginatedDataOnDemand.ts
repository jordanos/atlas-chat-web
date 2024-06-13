import { useState } from 'react';
import { parseFilterObj } from 'utils/parsers';
import useDebounce from 'hooks/useDebounce';
import { usePagination } from 'hooks/usePagination';
import { PAGE_SIZE, PAGE_START } from 'constants/pagination';

const useGetPaginatedDataOnDemand = (useQuery, params = null) => {
  const filters = params?.filters;
  const path = params?.path;
  const pagination = params?.pagination;
  // search values
  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchValue, 500);

  // pagination
  const [queryPagination, setQueryPagination] = usePagination(pagination || {});

  const parsedFilters = parseFilterObj(filters);

  // fetch data
  const [cbFn, { data: rawData, isLoading, refetch, isFetching }] = useQuery({
    pagination:
      !showSearch || debouncedSearchTerm === ''
        ? queryPagination
        : searchPagination,
    searchValue: '',
    filters: parsedFilters,
    path,
  });
  const data = rawData ? rawData.results : [];
  const rowCount = rawData ? rawData.page_metadata.count : null;
  const totalPages = rawData ? rawData.page_metadata.total_pages : null;

  return [
    (filtersNew: object) => {
      cbFn({
        pagination: { pageIndex: PAGE_START, pageSize: PAGE_SIZE },
        searchValue: '',
        filters: parseFilterObj(filtersNew?.filters),
        path,
      });
    },
    {
      isLoading,
      isFetching,
      manualPagination: true,
      pagination:
        !showSearch || debouncedSearchTerm === ''
          ? queryPagination
          : searchPagination,
      onPaginationChange:
        !showSearch || debouncedSearchTerm === ''
          ? setQueryPagination
          : setSearchPagination,
      rowCount,
      totalPages,
      data,
      searchValue,
      setSearchValue,
      showSearch,
      setShowSearch,
      refetch,
    },
  ];
};

export default useGetPaginatedDataOnDemand;
