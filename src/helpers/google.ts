/**
 * Returns URL unchanged.
 * @deprecated Kept for backward compatibility; no longer handles Google Drive.
 */
export const getGoogleDriveDirectLink = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return url;
  }
  return url;
};

/**
 * Returns URL unchanged.
 * @deprecated Kept for backward compatibility; no longer handles Google Drive.
 */
export const getGoogleDriveVideoEmbedLink = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return url;
  }
  return url;
};

/**
 * Returns URL unchanged.
 * @deprecated Kept for backward compatibility; no longer handles Google Drive.
 */
export const getSafeImageUrl = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return url;
  }
  return url;
};
