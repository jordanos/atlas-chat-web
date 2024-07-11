import { renderHook } from '@testing-library/react-hooks';
import { usePagination } from '../usePagination';

describe('usePagination', () => {
  it('Setting new page index', () => {
    // Arrange
    const initialProps = { pageIndex: 1, pageSize: 10 };
    const { result } = renderHook(() => usePagination(initialProps));
    const [pagination] = result.current;
    expect(pagination).toStrictEqual({ pageIndex: 1, pageSize: 10 });
  });
});
