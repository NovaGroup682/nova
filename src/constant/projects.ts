import { ProjectItemType, ProjectSize } from 'types';

const projects: ProjectItemType[] = [
  {
    id: 'nova-1',
    name: 'Nova-1',
    area: 175,
    beds: 4,
    baths: 3,
    areaType: ProjectSize.l,
    constructionArea: 216,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1ycboXgZ0IIGf1yoFLNimRMomEpwyY03H',
      '1GgFDQgt3beqEYmR5gdO9sCpz8XjpB9Tf'
    ],

    implementationCost: {
      shell: 8950000,
      insulatedShell: 12600000,
      facade: 14550000,
      interiorFinishes: 18750000
    },
    layouts: [
      {
        img: '1HR-v9KWXYMUyvmAcRz3eDNiy1jlDfchE',
        planWithArea: {
          1: 'Крыльцо 6.5',
          2: 'Прихожая 6.5',
          3: 'Гардеробная 3.5',
          4: 'Котельная-постирочная 6.5',
          5: 'Коридор 20.9',
          6: 'Гостевая/кабинет 10.8',
          7: 'Кладовая 5.5',
          8: 'Кухня-столовая-гостиная 45.3',
          9: 'Гостевой с/у 2.2',
          10: 'Постирочная 4.4',
          11: 'Мастер-спальня 16.7',
          12: 'Гардеробная 6.4',
          13: 'С/у 5.4',
          14: 'С/у 5.4',
          15: 'Детская 14.1',
          16: 'Детская 14.3',
          17: 'Терраса 19.7'
        },
        totalArea: 195
      }
    ]
  },
  {
    id: 'nova-2',
    name: 'Nova-2',
    area: 222,
    beds: 4,
    baths: 3,
    areaType: ProjectSize.xl,
    constructionArea: 310,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1VWZt3nX5-YdMM2ECixmH1lwzUkUdWWEE',
      '12wLLlkBGGwdzIFu6CEsoD-Ujz8N7mwiQ'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    layouts: [
      {
        img: '1HwhBsRrwcM43DyLqE09wnRzS7oOtniJ6',
        planWithArea: {
          1: 'Крыльцо 10.13',
          2: 'Прихожая 8.36',
          3: 'Гардеробная 5.47',
          4: 'Топочная 7.49',
          5: 'Холл 8.69',
          6: 'Общий с/у 6.16',
          7: 'Кабинет 15.15',
          8: 'Кладовая 3.11',
          9: 'Кухня-гостиная 53.50',
          10: 'Терраса 24.71'
        },
        totalArea: 142.77
      },
      {
        img: '1ch7oELjUJO-flxtcmwo0fRVOkK0d8VAX',
        planWithArea: {
          1: 'Холл 27.31',
          2: 'Второй свет 16.57',
          3: 'С/у 6.16',
          4: 'Детская 15.15',
          5: 'Детская 15.18',
          6: 'Постирочная 5.11',
          7: 'Мастер-спальня 16.75',
          8: 'Гардеробная 5.64',
          9: 'С/у 6.13'
        },
        totalArea: 113.99
      }
    ]
  },
  {
    id: 'nova-3',
    name: 'Nova-3',
    area: 231,
    beds: 0,
    baths: 0,
    areaType: ProjectSize.xl,
    constructionArea: 293,
    floor: 2,
    projectPrice: 0,
    price: 0,
    sliders: [
      '1_XiWiGUCRPE6-QHGne1XIEgvwikJS9Wb',
      '1hRfWoGyoQUL3Iy62iwGxXGhAJ3GgV9ef'
    ],
    // layouts: [
    //   '1yIqN3E03TcMzKV7MIGdJ5BT5T14gq5JK',
    //   '1kF6HwKq07Dd0bdCs0Aqc0S27rnsDm6nt',
    //   '1rPfBjfcUWVDIQnps-T0_m4ZrnPqK-pWO'
    // ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    layouts: [
      {
        img: '1yIqN3E03TcMzKV7MIGdJ5BT5T14gq5JK',
        planWithArea: {
          1: 'Прихожая 8.33',
          2: 'Холл 12.34',
          3: 'Лестница 8.55',
          4: 'Гостиная/столовая 29.36',
          5: 'Кухня 17.44',
          6: 'Кладовая кухни 4.51',
          7: 'Кладовая 3.36',
          8: 'С/у 6.48',
          9: 'Гостевая спальня 15.04',
          10: 'Топочная/постирочная 8.32',
          11: 'Гардеробная для верх.од 6.21',
          12: 'Терраса 25.76',
          13: 'Навес для авто 49.32'
        },
        totalArea: 195.02
      }
    ]
  },
  {
    id: 'nova-4',
    name: 'Nova-4',
    area: 174,
    beds: 0,
    baths: 0,
    areaType: ProjectSize.l,
    constructionArea: 230,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '17wt7C9T_H5UpMARvHYkLSv5wSuyJ6dP5',
      '1L1H4iCMlVLXth1n1MfWk6pIuBAk7Zqhq'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    layouts: [
      {
        img: '1OmhAB3ZMYYTC7p9cMYXIfkmyom50Q0Ic',
        planWithArea: {
          1: 'Прихожая 8.69',
          2: 'Котельная-постирочная 6.29',
          3: 'С/у 5.60',
          4: 'Лестница 5.83',
          5: 'Гостевая-кабинет 12.80',
          6: 'Гостиная-столовая 36.25',
          7: 'Кухня 8.78',
          8: 'Гардеробная-кладовая 5.68',
          9: 'Терраса 19.95',
          10: 'Навес для 2 авто 34.34'
        },
        totalArea: 144.21
      },
      {
        img: '12YmsBTdQ65UANYItiln7NmNIQBg2OEqa',
        planWithArea: {
          1: 'Холл 9.45',
          2: 'Детская спальня 1 12.80',
          3: 'Кладовая 3.23',
          4: 'Детская спальня 2 13.19',
          5: 'Кабинет 10.90',
          6: 'Мастер-спальня 16.56',
          7: 'Мастер-гардеробная 7.04',
          8: 'Мастер с/у 5.22',
          9: 'Общий с/у 5.60'
        },
        totalArea: 83.98
      }
    ]
  },
  {
    id: 'nova-5',
    name: 'Nova-5',
    area: 180,
    beds: 4,
    baths: 4,
    areaType: ProjectSize.l,
    constructionArea: 230,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1hWcmfamPYnYSQ3K5X752-vT2gqMt8Emt',
      '1UlnT0ZGl2r-BGkf1-50jXJx80pUH35Vu',
      '1A3X4R9eaIs5zuA53sXfXWpDfKA-mEIVj'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    layouts: [
      {
        img: '1MrM3CwCn-fTi-89Orp8to6n56LDOlWj1',
        planWithArea: {
          1: 'Прихожая 6.95',
          2: 'Холл/лестница 12.50',
          3: 'Котельная 7.06',
          4: 'Гостевой с/у 2.70',
          5: 'Постирочная/кладовая 4.14',
          6: 'Гардеробная при кухне 2.16',
          7: 'Кухня-гостиная 52.01',
          8: 'Гостевая спальня 14.41',
          9: 'С/у при спальне 3.73'
        },
        totalArea: 105.66
      },
      {
        img: '1pxJjGcl-T7itNUrpz8Yx0jVYaMSSA6nZ',
        planWithArea: {
          1: 'Холл 12.16',
          2: 'Детская спальня 1 13.19',
          3: 'Детская спальня 2 12.98',
          4: 'Общий с/у 4.50',
          5: 'Мастер спальня 18.67',
          6: 'Гардеробная 8.84',
          7: 'С/у при спальне 4.41'
        },
        totalArea: 74.76
      }
    ]
  },
  {
    id: 'nova-6',
    name: 'Nova-6',
    area: 238,
    beds: 0,
    baths: 0,
    areaType: ProjectSize.xl,
    constructionArea: 311,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '18VSFdvZYZOyxvtpkq8CEElzkN0rl_yln',
      '1YvZj7szaH5zrHVfFTVtrkVJEeG6QdTHF',
      '1ZWAS21rea86aF7XCk-dXkM1uo8w3-9qx'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    layouts: [
      {
        img: '1gv5ZQYJEmks11QbVtTgWn1wE1wNbfiCF',
        planWithArea: {
          1: 'Крыльцо 7.40',
          2: 'Холл и коридор 14.73',
          3: 'Гардеробная 8.53',
          4: 'Тех. помещение 7.21',
          5: 'Кабинет 12.71',
          6: 'Санузел 5.58',
          7: 'Постирочная 7.61',
          8: 'Кухня-столовая-гостиная 54.14',
          9: 'Кладовая 6.19',
          10: 'Терраса 30.41',
          11: 'Навес для 2 авто 44.34'
        },
        totalArea: 198.87
      }
    ]
  },
  {
    id: 'nova-7',
    name: 'Nova-7',
    area: 135,
    beds: 0,
    baths: 0,
    areaType: ProjectSize.m,
    constructionArea: 177,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1vePstUVyOXQHrMRVw2Mp10moaryiCB4c',
      '1GuIzSDintZOThHJqli50m9YXEzMs-uuT',
      '1L1UW9Z58aIySsLJXW7s6VIV1tuFzN7jN'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    layouts: [
      {
        img: '1rxhmPpbBDuMiTMOEdy0AIwYF-fC2waYR',
        planWithArea: {},
        totalArea: 0
      }
    ]
  },
  {
    id: 'nova-9',
    name: 'Nova-9',
    area: 150,
    beds: 3,
    baths: 4,
    areaType: ProjectSize.m,
    constructionArea: 184,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1Vy_xMJ03Y9J_fTun7IiUgDjCVlHY6C9r',
      '1P1zmPIMR7QTPPTi5MpsjSnkEDsfa4Y8H'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    layouts: [
      {
        img: '1zbULZkwa-NQUVgVRojiWdkDFefaEIl9N',
        planWithArea: {},
        totalArea: 0
      }
    ]
  },
  {
    id: 'nova-86',
    name: 'Nova-86',
    area: 248,
    beds: 0,
    baths: 0,
    areaType: ProjectSize.xl,
    constructionArea: 307,
    floor: 2,
    projectPrice: 0,
    price: 0,
    sliders: [
      '1UwQl4w3Phc1N0yQ636ALkkkSuS8hBWHD',
      '15imlmQBGnhCwo_FcXSXhyV2IfWfNcYvj'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    layouts: [
      {
        img: '1s0WJxS-C5P1GUxUiw9DmILFS9_MHl4kB',
        planWithArea: {},
        totalArea: 0
      },
      {
        img: '15JX3vOsIgdpJJ4EsryoVwbPmzeuu0evk',
        planWithArea: {},
        totalArea: 0
      }
    ]
  }
];

export default projects;
