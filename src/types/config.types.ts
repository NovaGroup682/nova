import { StaticImageData } from 'next/image';

export interface ConfigType {
  metadata: {
    favIcon: StaticImageData;
    name: string;
    domen: string;
    title: string;
    description: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?:
      | 'website'
      | 'article'
      | 'book'
      | 'profile'
      | 'music.song'
      | 'music.album'
      | 'music.playlist'
      | 'music.radio_station'
      | 'video.movie'
      | 'video.episode'
      | 'video.tv_show'
      | 'video.other';
    twitterCard?: 'summary' | 'summary_large_image' | 'player' | 'app';
    viewport?: string;
    robots?: string;
    canonical?: string;
  };
  copyrightLabel: string;
}
