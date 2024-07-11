import { renderHook } from '@testing-library/react-hooks';
import useDebounce from '../useDebounce';

describe('useDebounce', () => {
  it('Debounce hook setting', async () => {
    const { result, rerender, waitFor } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: {
          value: 'x',
          delay: 500,
        },
      }
    );
    expect(result.current).toBe('x');
    rerender({ value: 'y', delay: 500 });
    // wait until a state changes and check result
    await waitFor(() => {
      expect(result.current).toBe('y');
    });
  });
});
