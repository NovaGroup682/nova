import config from 'config';
import projects from 'constant/projects';

import content from 'content';

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: config.metadata.name,
  url: config.metadata.domen,
  logo: `${config.metadata.domen}/assets/logo.svg`,
  description: config.metadata.description,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'RU',
    addressLocality: 'Москва'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: content.contacts.phone,
    contactType: 'customer service'
  },
  sameAs: [
    'https://facebook.com/novagroup',
    'https://instagram.com/novagroup',
    'https://vk.com/novagroup'
  ]
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: config.metadata.name,
  url: config.metadata.domen,
  description: config.metadata.title,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${config.metadata.domen}/projects?search={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
};

export const generateProjectsStructuredData = () =>
  projects.map((project) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Проект ${project.name}`,
    description: `Проект дома ${project.name} от Nova Group. Площадь: ${project.variants[0]?.area || 'N/A'} м²`,
    url: `${config.metadata.domen}/project/${project.id}`,
    brand: {
      '@type': 'Brand',
      name: config.metadata.name
    },
    category: 'Строительство',
    offers: {
      '@type': 'Offer',
      price: project.projectPrice,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock'
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Площадь',
        value: `${project.variants[0]?.area || 'N/A'} м²`
      },
      {
        '@type': 'PropertyValue',
        name: 'Спальни',
        value: project.beds
      },
      {
        '@type': 'PropertyValue',
        name: 'Ванные',
        value: project.baths
      },
      {
        '@type': 'PropertyValue',
        name: 'Этажность',
        value: project.floor
      }
    ]
  }));

export const generateBreadcrumbStructuredData = (path: string) => {
  const baseUrl = config.metadata.domen;
  const pathSegments = path.split('/').filter(Boolean);

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
      item: baseUrl
    }
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const position = index + 2;

    let name = segment;
    if (segment === 'projects') name = 'Проекты';
    else if (segment === 'services') name = 'Услуги';
    else if (segment === 'design') name = 'Дизайн';
    else if (segment === 'contacts') name = 'Контакты';
    else if (segment === 'privacy-policy') name = 'Политика конфиденциальности';
    else if (segment === 'project') name = 'Проект';
    else if (segment === 'size') name = 'Размер';
    else if (segment === 'floor') name = 'Этажность';
    else if (segment === 'm') name = 'Средний';
    else if (segment === 'l') name = 'Большой';
    else if (segment === 'xl') name = 'Очень большой';
    else if (segment === '1') name = '1 этаж';
    else if (segment === '2') name = '2 этажа';
    else if (segment.startsWith('nova-')) name = `Проект ${segment}`;

    breadcrumbItems.push({
      '@type': 'ListItem',
      position,
      name,
      item: `${baseUrl}${currentPath}`
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  };
};

export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Какие услуги предоставляет Nova Group?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nova Group предоставляет полный спектр строительных услуг: проектирование, строительство, отделка жилых и коммерческих объектов.'
      }
    },
    {
      '@type': 'Question',
      name: 'Сколько стоит проект дома?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Стоимость проекта зависит от размера, сложности и выбранных материалов. Базовые проекты начинаются от 60,000 рублей.'
      }
    },
    {
      '@type': 'Question',
      name: 'Сколько времени занимает строительство?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Время строительства зависит от размера объекта и выбранного варианта отделки. Обычно от 3 до 12 месяцев.'
      }
    }
  ]
};
