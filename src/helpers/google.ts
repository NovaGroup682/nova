/**
 * Возвращает URL без изменений
 * @deprecated Функция оставлена для обратной совместимости, но больше не обрабатывает Google Drive
 */
export const getGoogleDriveDirectLink = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return url;
  }
  return url;
};

/**
 * Возвращает URL без изменений
 * @deprecated Функция оставлена для обратной совместимости, но больше не обрабатывает Google Drive
 */
export const getGoogleDriveVideoEmbedLink = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return url;
  }
  return url;
};

/**
 * Возвращает URL без изменений
 * @deprecated Функция оставлена для обратной совместимости, но больше не обрабатывает Google Drive
 */
export const getSafeImageUrl = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return url;
  }
  return url;
};
