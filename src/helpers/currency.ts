/**
 * Formats a number as currency with spaces and ruble symbol
 * @param amount - The amount to format
 * @returns Formatted string like "1 000 000 ₽"
 */
export const formatCurrency = (amount: number): string =>
  amount.toLocaleString('ru-RU') + ' ₽';
