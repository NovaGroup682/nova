import Facebook from '@assets/icons/facebook.svg';
import Instagram from '@assets/icons/instagram.svg';
import VK from '@assets/icons/vk.svg';
import ceo1 from '@assets/images/ceo/ceo-1.png';
import ceo2 from '@assets/images/ceo/ceo-2.png';
import navigation1 from '@assets/images/navigationBlock/navigation-1.png';
import navigation2 from '@assets/images/navigationBlock/navigation-2.png';
import navigation3 from '@assets/images/navigationBlock/navigation-3.png';
import slider1 from '@assets/images/slider/slider-1.png';
import slider2 from '@assets/images/slider/slider-2.png';
import slider3 from '@assets/images/slider/slider-3.png';
import slider4 from '@assets/images/slider/slider-4.png';
import slider5 from '@assets/images/slider/slider-5.png';
import { paths } from 'constant';

import { SocialLinkTypes } from 'types';

const content = {
  common: {
    allProjects: 'Все Проекты',
    call: 'Связаться',
    requiredField: 'Обязательное поле',
    policy: 'Политика Конфиденциальности'
  },
  header: {
    headerBtns: [
      {
        label: 'Главная',
        href: paths.main
      },
      {
        label: 'Проекты и Цены',
        href: paths.projects
      },
      {
        label: 'Проектирование',
        href: paths.design
      },
      {
        label: 'Авторский Надзор',
        href: paths.projects
      },
      {
        label: 'Контакты',
        href: paths.contacts
      }
    ]
  },
  main: {
    mainTitle: `Проектируем и строим\nсовременные каменные дома\nв рамках вашего бюджета`,
    slider: {
      titles: [
        'Nest House — простой путь к современному дому',
        'Идеально вписываются в популярные размеры участков',
        'Типовые решения, нетипичный подход',
        'Почему каменные дома?',
        'Современный дом доступнее чем кажется'
      ],
      body: [
        {
          img: slider1,
          text: 'Мы создаём типовые решения, продуманные до мелочей. Стильная архитектура — без неопределённости и с понятным бюджетом.'
        },
        {
          img: slider2,
          text: 'Созданы чтобы максимально эффективно использовать пространство, при этом учитывая такие факторы как: функциональность, естественное освещение и приватность.'
        },
        {
          img: slider3,
          text: 'Nest houses — это внимание к деталям во всём. Каждый дом — это чистая геометрия, правильный ритм окон и выверенные пропорции. Так создаются лаконичные пространства, которые вдохновляют и заряжают энергией каждый день.'
        },
        {
          img: slider4,
          text: 'Сочетание всех этих факторов делает каменные дома оптимальным выбором. Наши продуманные решения позволяют реализовать проект без лишних сложностей и с удовольствием жить в нём долгие годы.'
        },
        {
          img: slider5,
          text: 'Благодаря нашему системному подходу мы оптимизировали стоимость строительства, сохранив лучшие архитектурные решения. Вы получаете стильный, продуманный дом с ощущением качества в каждой детали. Закажите проект в Nest House.'
        }
      ]
    },
    text1:
      'Большинство индивидуальных проектов  не доходят до стройки без серьёзных упрощений — бюджет заказчика просто не совпадает с реальной стоимостью реализации.',
    text2:
      'Мы проектируем на базе продуманных типовых решений — с точным пониманием бюджета и финального результата. В итоге вы получаете стильный, современный дом — без компромиссов и лишних расходов.',
    text3: `Мы берем на себя самое сложное, чтобы вы\nполучили удовольствие от процесса`,
    projectsSlider: [
      {
        id: 'NOVA-1',
        name: 'NOVA 1',
        square: 175,
        beds: 4,
        baths: 3,

        img: 'https://drive.google.com/uc?export=view&id=1ycboXgZ0IIGf1yoFLNimRMomEpwyY03H'
      },
      {
        id: 'NOVA-2',
        name: 'NOVA 2',
        square: 222,
        beds: 4,
        baths: 3,
        img: 'https://drive.google.com/uc?export=view&id=1VWZt3nX5-YdMM2ECixmH1lwzUkUdWWEE'
      },
      {
        id: 'NOVA-9',
        name: 'NOVA 9',
        square: 150,
        beds: 3,
        baths: 4,
        img: 'https://drive.google.com/uc?export=view&id=15-Tt4ll9QwtmjvqYtNHtvhAtYcBqejW8'
      },
      {
        id: 'NOVA-5',
        name: 'NOVA 5',
        square: 150,
        beds: 4,
        baths: 4,
        img: 'https://drive.google.com/uc?export=view&id=1hWcmfamPYnYSQ3K5X752-vT2gqMt8Emt'
      }
    ],
    ceo: [
      {
        label: 'Зиновий Аксенцев - архитектор',
        description:
          'руководствуется принципами честности, ответственности и стремления к совершенству, обеспечивая высокое качество строительства и довольных клиентов.',
        img: ceo1
      },
      {
        label: 'Игорь Ильин - инженер-строитель',
        description:
          'руководствуется принципами честности, ответственности и стремления к совершенству, обеспечивая высокое качество строительства и довольных клиентов.',
        img: ceo2
      }
    ],
    navigationBlcok: [
      {
        title: 'Типовые проекты',
        description:
          'готовые решения, которые можно адаптировать под ваш участок.',
        img: navigation1,
        path: paths.projects
      },
      {
        title: 'Индивидуальное проектирование',
        description: 'создаём дом с нуля под ваш стиль жизни и в рамах бюджета',
        img: navigation2,
        path: paths.design
      },
      {
        title: 'Строительство домов',
        description: [
          'прозрачная смета',
          'контроль на каждом этапе',
          'всегда на связи'
        ],
        img: navigation3,
        path: paths.projects
      }
    ],
    contactBlock: {
      send: 'Отправить',
      callYouLater: 'Спасибо, мы скоро с вами свяжемся.',
      wrongNumber: 'Неправильно введен номер телефона',
      region: 'Регион строительства',
      yourName: 'Как мы можем к вам обращаться?',
      phone: 'Телефон'
    }
  },
  contacts: {
    email: 'vasha@pochta.ru',
    phone: '8 800 000 00 00',
    address: 'Россия, г Москва , ул. Примерная 345',
    law: 'Сайт носит сугубо информационный характер и не является публичной офертой, определяемой Статьей 437 (2) ГК РФ',
    socialLinks: [
      {
        type: SocialLinkTypes.Facebook,
        link: 'https://www.facebook.com/?locale=ru_RU',
        alt: 'Facebook',
        icon: Facebook
      },
      {
        type: SocialLinkTypes.VK,
        link: 'https://m.vk.com/',
        alt: 'ВКонтакте',
        icon: VK
      },
      {
        type: SocialLinkTypes.Instagram,
        link: 'https://www.instagram.com/',
        alt: 'Instagram',
        icon: Instagram
      }
    ]
  }
};

export default content;
