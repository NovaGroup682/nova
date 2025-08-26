// import Facebook from '@assets/icons/facebook.svg';
import Instagram from '@assets/icons/instagram.svg';
// import VK from '@assets/icons/vk.svg';
import Telegram from '@assets/icons/telegram.svg';
import Whatsapp from '@assets/icons/whatsapp.svg';
import { GOOGLE_LINK, paths } from 'constant';

import {
  getGoogleDriveDirectLink,
  getGoogleDriveVideoEmbedLink
} from 'helpers';

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
        label: 'Услуги',
        href: paths.services
      },
      {
        label: 'Контакты',
        href: paths.contacts
      }
    ]
  },
  main: {
    mainTitle: [
      'Проектируем и строим',
      'современные каменные дома',
      'в рамках вашего бюджета'
    ],
    mainImgBg: GOOGLE_LINK + '13fWS-8f6fz7XtLKNQevNU6ngufKVcJ2w',
    mainPopupBg: GOOGLE_LINK + '1QPwqY11NsSoQecLmKIcvjdcMVV3oG3K-',
    slider: {
      titles: [
        'Nova — простой путь к современному дому',
        'Идеально вписываются в популярные размеры участков',
        'Типовые решения, нетипичный подход',
        'Почему каменные дома?',
        'Современный дом доступнее чем кажется'
      ],
      body: [
        {
          img: GOOGLE_LINK + '16gn47SIqnx5IQPyahdELi2VEMGKQwxOU',
          text: 'Мы создаём типовые решения, продуманные до мелочей. Стильная архитектура — без неопределённости и с понятным бюджетом.'
        },
        {
          img: GOOGLE_LINK + '1o2znAKwEo6M1egyEJjjUB6hDUltWNK4t',
          text: 'Созданы чтобы максимально эффективно использовать пространство, при этом учитывая такие факторы как: функциональность, естественное освещение и приватность.'
        },
        {
          img: GOOGLE_LINK + '1YTZychxBNGWExAo6FDdSG72gmUbO0fSU',
          text: 'Nova — это внимание к деталям во всём. Каждый дом — это чистая геометрия, правильный ритм окон и выверенные пропорции. Так создаются лаконичные пространства, которые вдохновляют и заряжают энергией каждый день.'
        },
        {
          img: GOOGLE_LINK + '1RqkXOP1SDWhp4Q4CPPpZvqvkKYIxy4Dy',
          text: 'Сочетание всех этих факторов делает каменные дома оптимальным выбором. Наши продуманные решения позволяют реализовать проект без лишних сложностей и с удовольствием жить в нём долгие годы.'
        },
        {
          img: GOOGLE_LINK + '1dprfixfL0MOgPugCva1kRyJyQjDAOafG',
          text: 'Благодаря нашему системному подходу мы оптимизировали стоимость строительства, сохранив лучшие архитектурные решения. Вы получаете стильный, продуманный дом с ощущением качества в каждой детали. Закажите проект в Nova.'
        }
      ]
    },
    text1:
      'Большинство индивидуальных проектов  не доходят до стройки без серьёзных упрощений — бюджет заказчика просто не совпадает с реальной стоимостью реализации.',
    text2:
      'Мы проектируем на базе продуманных типовых решений — с точным пониманием бюджета и финального результата. В итоге вы получаете стильный, современный дом — без компромиссов и лишних расходов.',
    text3: `Мы берем на себя самое сложное, чтобы вы\nполучили удовольствие от процесса`,
    projectsSliders: ['nova-1', 'nova-2', 'nova-9', 'nova-5'],
    ceo: [
      {
        label: 'Зиновий Аксенцев - архитектор',
        description:
          'Главная цель наших проектов - чтобы их действительно строили. Я как архитектор отвечаю за то, чтобы проект был логичным, удобным и адаптированным под реалии рынка.',
        img: GOOGLE_LINK + '1wHDzZ8WFSuevFO7-1XdXBUuRF9GojPwZ'
      },
      {
        label: 'Игорь Ильин - инженер-строитель',
        description:
          'Мы проектируем современные и функциональные дома с акцентом на реальную стоимость строительства. Не делаем «дорогих картинок» — проектируем так, чтобы дом был реализуемым, удобным и вписывался в бюджет клиента.',
        img: GOOGLE_LINK + '1n1ILMCpkDQUaT5uxkgOLkc_5KB0SzIG4'
      }
    ],
    navigationBlcok: [
      {
        title: 'Типовые проекты',
        description: `готовые решения, которые можно\nадаптировать под ваш участок`,
        img: GOOGLE_LINK + '1wibx600imEROiiJz_EQY5MrMcC5s3OYz',
        path: paths.projects
      },
      {
        title: 'Индивидуальное проектирование',
        description: `создаём дом с нуля под ваш стиль\nжизни и в рамах бюджета`,
        img: GOOGLE_LINK + '1O3mQI6NFlXK3TPQWT9x7tcLOY0CwhB4d',
        path: paths.design
      },
      {
        title: 'Строительство домов',
        description: [
          'прозрачная смета',
          'контроль на каждом этапе',
          'всегда на связи'
        ],
        img: GOOGLE_LINK + '1MjE6ucharO37nISKHOBCCLY_5Wl0NyaL',
        path: paths.services
      }
    ],
    contactBlock: {
      send: 'Отправить',
      callYouLater: 'Спасибо, мы скоро с вами свяжемся.',
      wrongNumber: 'Неправильно введен номер телефона',
      region: 'Регион строительства',
      yourName: 'Как мы можем к вам обращаться?',
      phone: 'Телефон',
      contactCover: GOOGLE_LINK + '1_ka5s9bKYNeSIp4Q0HD4LXlh9x5hv-5S'
    }
  },
  projectDetails: {
    titlesRow: ['Коробка', 'Теплый контур', 'С фасадом', 'С отделкой'],
    bodyRows: [
      {
        name: 'Фундамент',
        desciption: `Монолитная плита 350 мм\n(уточняется по результатам геологии)`,
        included: {
          Коробка: true,
          'Теплый контур': true,
          'С фасадом': true,
          'С отделкой': true
        }
      },
      {
        name: 'Несущие стены',
        desciption: `Газоблок / Керамоблок / Кирпич`,
        included: {
          Коробка: true,
          'Теплый контур': true,
          'С фасадом': true,
          'С отделкой': true
        }
      },
      {
        name: 'Перегородки',
        desciption: `Газоблок / Керамоблок / Кирпич`,
        included: {
          Коробка: false,
          'Теплый контур': true,
          'С фасадом': true,
          'С отделкой': true
        }
      },
      {
        name: 'Отделка фасада',
        desciption: `Кирпич / Штукатурка / Комбинированный`,
        included: {
          Коробка: false,
          'Теплый контур': false,
          'С фасадом': true,
          'С отделкой': true
        }
      },
      {
        name: 'Кровля',
        desciption: `Металлочерепица\nДругие варианты: гибкая черепица,\nфальцевая кровля, плоская кровля`,
        included: {
          Коробка: true,
          'Теплый контур': true,
          'С фасадом': true,
          'С отделкой': true
        }
      },
      {
        name: 'Кровля',
        desciption: `(утепление, подшивка свесов,\nводосточная система, отделка вентканала)`,
        included: {
          Коробка: false,
          'Теплый контур': true,
          'С фасадом': true,
          'С отделкой': true
        }
      },
      {
        name: 'Окна и двери',
        desciption: `ПВХ 70мм окна и входная металлическая дверь`,
        included: {
          Коробка: false,
          'Теплый контур': true,
          'С фасадом': true,
          'С отделкой': true
        }
      },
      {
        name: 'Отделка WHITE BOX',
        desciption: `Оштукатуривание стен, стяжка пола,\nэлектромонтажные работы, система отопления,\nводоснабжения и канализации (в т.ч. котел, радиаторы,\nтеплый пол)`,
        included: {
          Коробка: false,
          'Теплый контур': false,
          'С фасадом': false,
          'С отделкой': true
        }
      },
      {
        name: 'Навес и терраса',
        desciption: 'Опция',
        included: {
          Коробка: false,
          'Теплый контур': false,
          'С фасадом': false,
          'С отделкой': false
        }
      },
      {
        name: 'Чистовая отделка',
        desciption: 'Опция',
        included: {
          Коробка: false,
          'Теплый контур': false,
          'С фасадом': false,
          'С отделкой': false
        }
      },
      {
        name: 'Организация стройплощадки',
        desciption: 'Опция',
        included: {
          Коробка: false,
          'Теплый контур': false,
          'С фасадом': false,
          'С отделкой': false
        }
      }
    ],
    estimateModal: {
      text: 'Внутри - полный расчёт стоимости строительства по этапам, с учётом материалов и работ. Вы сразу понимаете, во сколько обойдётся дом, и можете трезво оценить бюджет - ещё до разговора с менеджером.'
    },
    editModal: {
      questionTitle: 'Можно ли внести изменения в проект?',
      answerTitle:
        'Да, при покупке типового проекта вы можете внести изменения. Сначала согласуем перечень корректировок с архитектором, затем рассчитываем стоимость - она прибавляется к базовой цене проекта. Также уточняем сроки выдачи обновлённой документации.',
      toChangeTitle: 'Что можно изменить:',
      changeVariants: [
        'адаптация наружных стен под регион строительства',
        'замена фасадных материалов - незначительные изменения планировки',
        'добавление или перенос окна, проёма и т.п.'
      ],
      description:
        'Наши проекты изначально сбалансированы по архитектуре, логике планировки, стоимости реализации и адаптированы под стандартный участок. Мы рекомендуем использовать их в базовой версии - так вы получаете оптимальный результат без существенного увеличения бюджета на реализацию. Глобальные изменения могут повлиять на целостность концепции и потребуют серьёзной переработки. В таких случаях мы предлагаем индивидуальное проектирование.'
    }
  },
  design: {
    main: 'Индивидуальное проектирование современных домов',
    subTitle:
      'Решение под конкретный участок, образ жизни, бюджет и приоритеты.',
    desciption:
      'Мы подходим к проектированию системно: на выходе — современный, продуманный до мелочей дом, в котором сочетаются архитектура, логика и реалистичный бюджет.',
    mainImg: getGoogleDriveDirectLink(
      'https://drive.google.com/file/d/175iLKt29yl8elGEjW4_IkwvDwAVqxZuc/view?usp=sharing'
    ),
    architecturalSection: {
      title: 'Архитектурный раздел',
      video: getGoogleDriveVideoEmbedLink(
        'https://drive.google.com/file/d/1NkohgTlsLE3w4U-4nMx4tsfwxNvlcyNW/view?usp=sharing'
      ),
      preview: getGoogleDriveDirectLink(
        'https://drive.google.com/file/d/13JXAB6qrF44Dx-W3VNDYF86jc-54ITw3/view?usp=sharing'
      ),
      src: getGoogleDriveDirectLink(
        'https://drive.google.com/file/d/1bg8MK420HPS4NK5qEDtvXIFqD06gI90_/view?usp=sharing'
      ),
      text1:
        'Проект начинается с эскизной части. Мы анализируем участок, продумываем планировки, формируем фасады и общий образ дома. Уже на этом этапе становится понятно, как дом будет выглядеть, как он встанет на участок и сколько примерно обойдётся строительство.',
      text2:
        'Далее - рабочая часть: подготавливаем полный комплект архитектурных чертежей, необходимых для реализации проекта.',
      carousel: [
        {
          label: 'Планировка',
          description: 'Функциональная и продуманная планировка',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1saXi9OehgcgKNpng146_O5yFivttpcw6/view?usp=sharing'
          )
        },
        {
          label: 'Организация участка',
          description:
            'Привязка дома к участку с продуманными сценариями использования',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1JwS7zUEqJTsLO0NprDdz4CDVfQRmvEt1/view?usp=sharing'
          )
        },
        {
          label: 'Фасады',
          description: 'Внешний облик дома с грамотно подобранными материалами',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1o9oeh0LG2ugXl0VtIFI_hUiDN_RtW7Ok/view?usp=sharing'
          )
        },
        {
          label: 'Визуализации',
          description:
            'Реалистичная 3D-модель, которая помогает представить дом ещё до начала стройки',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1T0UQk1NqyiF9M7Ja_AcBIQtxss9bMBF0/view?usp=sharing'
          )
        },
        {
          label: 'Разрезы',
          description:
            'Высотные отметки, уровни и принципиальные технические решения',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1f3VtMj_tYN2gMKLastgybbhyipxlTPMZ/view?usp=sharing'
          )
        },
        {
          label: 'Узлы',
          description: 'Ключевые архитектурные решения',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1kYCU9wRcFvQdoqm2A_gw9ijIXsW3IDqw/view?usp=sharing'
          )
        },
        {
          label: 'Ведомости',
          description: 'Объёмы и площади всех материалов',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1jdAwtbVQAxuA9gcDWOBKpW6wABKrj5jS/view?usp=sharing'
          )
        }
      ]
    },
    constructionSection: {
      title: 'Конструктивный раздел',
      video: getGoogleDriveVideoEmbedLink(
        'https://drive.google.com/file/d/1Aq7dLWYTgj36z9n79HhEfoWjjJJN2JRy/view?usp=sharing'
      ),
      preview: getGoogleDriveDirectLink(
        'https://drive.google.com/file/d/17eTZ6lRZRpxd7TSly-VjdGM_k2oAS_Hp/view?usp=sharing'
      ),
      src: getGoogleDriveDirectLink(
        'https://drive.google.com/file/d/1pW5WugiVKic5eWXk07dxhuAb7HGsZ5PK/view?usp=sharing'
      ),
      text1:
        'В этот раздел входят чертежи всех несущих конструкций: фундамента, стен, перекрытий и кровли. Он нужен, чтобы дом был прочным, устойчивым и соответствовал строительным нормам.',
      text2:
        'В проекте указываются размеры, армирование, узлы и другие важные детали — чтобы строителям было понятно, как строить, не пришлось додумывать на месте и удалось избежать ошибок.',
      carousel: [
        {
          label: 'Моделирование',
          description:
            'Детальное моделирование здания для расчета нагрузок и объемов материалов.',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/123IQ0uHpjkWLTKucnb5h8Mjh4OY125ze/view?usp=sharing'
          )
        },
        {
          label: 'Фундамент',
          description: 'План фундамента с размерами, привязками и сечениями.',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/17bw-OVfqaBs8MDPTy0oeJZZDhOSEfrXB/view?usp=sharing'
          )
        },
        {
          label: 'Вертикальные конструкции',
          description:
            'Железобетонные конструкции стен, колонн и пилонов со схемами армирования.',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1z0-Od1BZewaEPlMfG5T2xrjF9MaT6hdl/view?usp=sharing'
          )
        },
        {
          label: 'Стены',
          description:
            'Подробный кладочный план с проёмами, размерами и 3D-схемами.',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1A55nT18_jWeqKvhRbzO1AlqjH6MkdvDk/view?usp=sharing'
          )
        },
        {
          label: 'Перекрытия и покрытия',
          description:
            'Подробные опалубочные планы с размерами, привязкой отверстий, толщинами и схемой армирования.',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1G-bLOemgOhgP6YRU2kwWsPWs2GKeKSdt/view?usp=sharing'
          )
        },
        {
          label: 'Лестница',
          description:
            'Детализированное армирование лестницы, узлы и спецификации.',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/1Wz4kIsu93apEX5LdpnYqwEM9jDwUieVX/view?usp=sharing'
          )
        },
        {
          label: 'Ведомости',
          description: 'Объёмы и площади всех конструктивных материалов.',
          src: getGoogleDriveDirectLink(
            'https://drive.google.com/file/d/161X4Qbu_ESbb28QVxH86cZ9p8ZcHVNUS/view?usp=sharing'
          )
        }
      ]
    }
  },
  services: {
    title: 'Услуги',
    description: '',
    mainImg: getGoogleDriveDirectLink(
      'https://drive.google.com/file/d/1R4zeJatlLnZ1Ft8-2ZqWzAmxvWsskOj5/view?usp=sharing'
    ),
    servicesList: [
      {
        label: 'Продажа типовых проектов',
        list: [
          'Проектируем современные серийные проекты с функциональной планировкой',
          'Обеспечиваем оптимальную цену строительства',
          'Предоставляем возможность внести изменения',
          'Создаем простые и понятные чертежи для строителей',
          'Вы получаете смету в Excel при покупке проекта, так удобнее общаться с подрядчиком и контролировать бюджет'
        ]
      },
      {
        label: 'Индивидуальное проектирование',
        list: [
          'Проектируем современные дома под ваш сценарий жизни',
          'Создаём рациональные планировки с учётом особенностей участка',
          'Подбираем решения в рамках целевого бюджета на строительство',
          'Имеем опыт в реализации сложных задач и создании качественного продукта'
        ]
      },
      {
        label: 'Строительство',
        list: [
          'Предоставляем прозрачную детальную смету',
          'Привлекаем квалифицированных специалистов',
          'Осуществляем технический надзор за строительством',
          'Предоставляем гарантию на строительство, как надежная компания с 10 летним опытом',
          'Сервис - берём на себя организацию стройки, чтобы вы получили удовольствие от процесса'
        ]
      },
      {
        label: 'Переработка проекта под ваш бюджет',
        list: [
          'Ваш проект не вписывается в бюджет на строительство?',
          'Анализируем архитектурные и конструктивные решения',
          'Находим решения и адаптируем под ваши возможности',
          'Предлагаем комплекс оптимизаций и при необходимости перерабатываем проект'
        ]
      },
      {
        label: 'Авторский надзор за реализацией',
        list: [
          'Хотите меньше ошибок и лишних затрат на стройке? Наша команда поможет Вам в этом вопросе',
          'Создаём рабочий чат в Telegram с вашим подрядчиком, а также архитектором и инженером с нашей стороны',
          'Анализируем фото- и видеоотчёты по каждому этапу',
          'Следим за ходом работ и корректируем подрядчиков при необходимости',
          'Помогаем Вам принимать решения и отвечаем на вопросы'
        ]
      }
    ]
  },
  contacts: {
    email: 'vasha@pochta.ru',
    phone: '8 800 000 00 00',
    address: 'Россия, г Москва , ул. Примерная 345',
    coordinates: [55.755819, 37.617644],
    law: 'Сайт носит сугубо информационный характер и не является публичной офертой, определяемой Статьей 437 (2) ГК РФ',
    socialLinks: [
      {
        type: SocialLinkTypes.Whatsapp,
        link: 'https://www.whatsapp.com/',
        alt: 'Whatsapp',
        icon: Whatsapp
      },
      {
        type: SocialLinkTypes.Telegram,
        link: 'https://web.telegram.org/k/',
        alt: 'Telegram',
        icon: Telegram
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
