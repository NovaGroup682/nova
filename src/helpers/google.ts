import { GOOGLE_LINK } from 'constant';

export const getGoogleDriveDirectLink = (url: string): string => {
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL provided');
  }

  // Если URL уже является прямой ссылкой на Google Drive, возвращаем как есть
  if (url.includes('drive.google.com/uc?export=view&id=')) {
    return url;
  }

  // Если это обычная ссылка на Google Drive
  const match = url.match(/\/d\/([^/]+)\//);
  if (!match) {
    // Если это не Google Drive ссылка, возвращаем оригинальный URL
    return url;
  }

  const fileId = match[1];
  return GOOGLE_LINK + fileId;
};

export const getGoogleDriveVideoEmbedLink = (url: string): string => {
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL provided');
  }

  const match = url.match(/\/d\/([^/]+)\//);
  if (!match) {
    throw new Error('Invalid Google Drive file URL');
  }

  const fileId = match[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

// Функция для безопасного получения изображения с fallback
export const getSafeImageUrl = (url: string): string => {
  try {
    return getGoogleDriveDirectLink(url);
  } catch (error) {
    console.warn('Failed to process Google Drive URL:', error);
    return url; // Возвращаем оригинальный URL как fallback
  }
};
