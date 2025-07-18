import { StaticImageData } from 'next/image';

export interface ConfigType {
  metadata: {
    favIcon: StaticImageData;
    title: string;
    description: string;
  };
  copyrightLabel: string;
}
