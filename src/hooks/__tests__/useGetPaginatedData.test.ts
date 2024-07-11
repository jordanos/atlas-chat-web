import { act, renderHook } from '@testing-library/react-hooks';
import { PAGE_SIZE, PAGE_START } from 'constants/pagination';
import { useEffect, useState } from 'react';
import useGetPaginatedData from '../useGetPaginatedData';

const MOCK_DATA = {
  page_metadata: {
    count: 1,
    total_pages: 1,
  },
  results: [{ id: 1, username: 'test user' }],
};

// mock useQuery function
const useQueryMock = (url: string) => {
  const [data, setData] = useState<undefined | any>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setData(MOCK_DATA);
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, refetch, url };
};

describe('useGetPaginatedData', () => {
  it('get paginated data', async () => {
    const { result, waitFor } = renderHook(
      ({ useQuery, params }) => useGetPaginatedData(useQuery, params),
      {
        initialProps: { useQuery: useQueryMock, params: {} },
      }
    );
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data.length).toBe(0);
    expect(result.current.totalPages).toBe(null);
    expect(result.current.pagination).toStrictEqual({
      pageIndex: PAGE_START,
      pageSize: PAGE_SIZE,
    });
    // Wait until data is updated and validate data
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data.length).toBe(1);
    expect(result.current.data[0]).toStrictEqual(MOCK_DATA.results[0]);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.rowCount).toBe(1);

    // Refetch and check new state
    act(() => {
      result.current.refetch();
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data.length).toBe(1);
    expect(result.current.totalPages).toBe(1);

    // Wait until data is updated and validate data
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.data.length).toBe(1);
    expect(result.current.data[0]).toStrictEqual(MOCK_DATA.results[0]);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.rowCount).toBe(1);
  });
});
