import { GOOGLE_LINK } from 'constant';

export const getGoogleDriveDirectLink = (url: string) => {
  const match = url.match(/\/d\/([^/]+)\//);
  if (!match) {
    throw new Error('Invalid Google Drive file URL');
  }
  const fileId = match[1];
  return GOOGLE_LINK + fileId;
};
