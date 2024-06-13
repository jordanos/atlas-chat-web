import { formatPrice } from 'utils/format';

test('Format price returns a string', () => {
  expect(typeof formatPrice(10)).toEqual('string');
});
