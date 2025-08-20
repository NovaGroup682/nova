export const formatNumberWithSpaces = (value: string): string => {
  const numericValue = value.replace(/\s/g, '');
  if (!numericValue) return '';

  const number = parseInt(numericValue, 10);
  if (isNaN(number)) return '';

  return number.toLocaleString('ru-RU');
};

export const parseFormattedNumber = (value: string): string =>
  value.replace(/\s/g, '');

export const validateMinimumValue = (
  value: string,
  minValue: number
): boolean => {
  const numericValue = parseInt(parseFormattedNumber(value), 10);
  return !isNaN(numericValue) && numericValue >= minValue;
};

export const isMinPriceValid = (price: string, minValue: number) => {
  if (!price) return true; // Allow empty values
  return validateMinimumValue(price, minValue);
};

export const isMaxPriceValid = (price: string, minValue: number) => {
  if (!price) return true; // Allow empty values
  return validateMinimumValue(price, minValue);
};

export const isPriceValid = (min: string, max: string) => {
  if (!min || !max) return true; // Allow empty values
  const minNum = parseInt(parseFormattedNumber(min), 10);
  const maxNum = parseInt(parseFormattedNumber(max), 10);
  if (isNaN(minNum) || isNaN(maxNum)) return true; // Allow non-numeric values during typing
  return minNum <= maxNum;
};
