export * from './currency';
export * from './google';
export * from './numeric';
export * from './projects';
export * from './text';

/**
 * Проверяет, изменились ли URL параметры
 * @param oldParams - старые параметры
 * @param newParams - новые параметры
 * @returns true, если параметры изменились
 */
export const hasUrlParamsChanged = (
  oldParams: URLSearchParams,
  newParams: URLSearchParams
): boolean => oldParams.toString() !== newParams.toString();

/**
 * Проверяет, изменилось ли конкретное значение параметра
 * @param oldValue - старое значение
 * @param newValue - новое значение
 * @returns true, если значение изменилось
 */
export const hasValueChanged = (oldValue: string, newValue: string): boolean =>
  oldValue !== newValue;
