export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
  }).format(price);
};

export const abbreviateNumber: (
  number: number,
  fixed?: number
) => (string | number)[] = (number: number, fixed = 2) => {
  if (Number.isNaN(number)) {
    // Handle non-numeric input
    return [number, ''];
  }

  if (number < 1 && number > -1) {
    return [number, ''];
  }

  const abbreviations = ['', 'K', 'M', 'B', 'T'];
  // Exponents for each abbreviation
  const magnitudes = [0, 3, 6, 9, 12];
  // Find the appropriate exponent
  const exponent = Math.floor(Math.log10(Math.abs(number)) / 3) || 0;
  const abbreviation = abbreviations[exponent];
  const scaledNumber = number / 10 ** magnitudes[exponent];

  return [scaledNumber.toFixed(fixed), abbreviation];
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
