import Favicon from '@assets/favicon.ico';

import { ConfigType } from 'types';

const config: ConfigType = {
  metadata: {
    favIcon: Favicon,
    name: 'Nova Group',
    domen: 'https://ngnova.ru',
    title:
      'Nova Group - Строительная компания | Проектирование и строительство',
    description:
      'Nova Group - ведущая строительная компания. Проектирование, строительство и отделка жилых и коммерческих объектов. Качественные решения для вашего комфорта.',
    keywords:
      'строительная компания, проектирование, строительство, отделка, недвижимость, Nova Group',
    ogTitle: 'Nova Group - Проектирование и строительство современных домов',
    ogDescription:
      'Строительная компания Nova Group. Проектируем и строим современные каменные дома в рамках вашего бюджета. Типовые решения с продуманной планировкой.',
    ogImage: '/assets/images/main_page/main.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
    canonical: 'https://ngnova.ru'
  },
  copyrightLabel: 'Nova Group',
  storageId:
    process.env.NODE_ENV === 'production'
      ? 'rladuqqmnofx4wsc'
      : 'fzsvndvghhlh5mdb'
};

export default config;
