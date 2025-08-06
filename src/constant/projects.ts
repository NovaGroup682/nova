import { ProjectItemType, ProjectSize } from 'types';

const projects: ProjectItemType[] = [
  {
    id: 'nova-1',
    name: 'Nova-1',
    beds: 4,
    baths: 3,
    areaType: ProjectSize.l,
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
    variants: [
      {
        constructionArea: 216,
        area: 175,
        layouts: [
          {
            img: '1UDPNpcGZZc_Kv9lPIF3ZL7Dh3i9WVaNR',
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
      }
    ]
  },
  {
    id: 'nova-2',
    name: 'Nova-2',
    beds: 4,
    baths: 3,
    areaType: ProjectSize.xl,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1VWZt3nX5-YdMM2ECixmH1lwzUkUdWWEE',
      '12wLLlkBGGwdzIFu6CEsoD-Ujz8N7mwiQ'
    ],
    implementationCost: {
      shell: 10660000,
      insulatedShell: 14880000,
      facade: 17350000,
      interiorFinishes: 23350000
    },
    variants: [
      {
        area: 222,
        constructionArea: 310,
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
      }
    ]
  },
  {
    id: 'nova-3',
    name: 'Nova-3',
    beds: 0,
    baths: 0,
    areaType: ProjectSize.xl,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1_XiWiGUCRPE6-QHGne1XIEgvwikJS9Wb',
      '1hRfWoGyoQUL3Iy62iwGxXGhAJ3GgV9ef'
    ],
    implementationCost: {
      shell: 11100000,
      insulatedShell: 15500000,
      facade: 18050000,
      interiorFinishes: 24300000
    },
    variants: [
      {
        area: 231,
        constructionArea: 293,
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
      }
    ]
  },
  {
    id: 'nova-4',
    name: 'Nova-4',
    beds: 0,
    baths: 0,
    areaType: ProjectSize.l,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '17wt7C9T_H5UpMARvHYkLSv5wSuyJ6dP5',
      '1L1H4iCMlVLXth1n1MfWk6pIuBAk7Zqhq'
    ],
    implementationCost: {
      shell: 8400000,
      insulatedShell: 11700000,
      facade: 13600000,
      interiorFinishes: 18300000
    },
    variants: [
      {
        area: 174,
        constructionArea: 230,
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
      }
    ]
  },
  {
    id: 'nova-5',
    name: 'Nova-5',
    estimateFileLink: '1m3pvKIay3wpoIuL6_jG7K1KpQbL8Ogo5',
    beds: 4,
    baths: 4,
    areaType: ProjectSize.l,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1hWcmfamPYnYSQ3K5X752-vT2gqMt8Emt',
      '1UlnT0ZGl2r-BGkf1-50jXJx80pUH35Vu',
      '1A3X4R9eaIs5zuA53sXfXWpDfKA-mEIVj'
    ],
    implementationCost: {
      shell: 8650000,
      insulatedShell: 12100000,
      facade: 14050000,
      interiorFinishes: 18900000
    },
    variants: [
      {
        area: 180,
        constructionArea: 230,
        layouts: [
          {
            img: '1Dtof8FAF_-aob07CgruV_DcOUbpVsPM8',
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
            img: '1enmlj6-UjxPgzeZrBxJq0QABMIIQc9Dm',
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
      }
    ]
  },
  {
    id: 'nova-6',
    name: 'Nova-6',
    beds: 0,
    baths: 0,
    areaType: ProjectSize.xl,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '18VSFdvZYZOyxvtpkq8CEElzkN0rl_yln',
      '1YvZj7szaH5zrHVfFTVtrkVJEeG6QdTHF',
      '1ZWAS21rea86aF7XCk-dXkM1uo8w3-9qx'
    ],
    implementationCost: {
      shell: 11450000,
      insulatedShell: 15950000,
      facade: 18600000,
      interiorFinishes: 25000000
    },
    variants: [
      {
        area: 238,
        constructionArea: 311,
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
      }
    ]
  },
  {
    id: 'nova-7',
    name: 'Nova-7',
    beds: 0,
    baths: 0,
    areaType: ProjectSize.m,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1vePstUVyOXQHrMRVw2Mp10moaryiCB4c',
      '1GuIzSDintZOThHJqli50m9YXEzMs-uuT',
      '1L1UW9Z58aIySsLJXW7s6VIV1tuFzN7jN'
    ],
    implementationCost: {
      shell: 6900000,
      insulatedShell: 9750000,
      facade: 11200000,
      interiorFinishes: 14450000
    },
    variants: [
      {
        area: 135,
        constructionArea: 177,
        layouts: [
          {
            img: '14Hrlib82k9XqiKBspT3S2JVwPPW7vAvF',
            planWithArea: {
              1: 'Прихожая 4.24',
              2: 'Гардероб при входе 2.79',
              3: 'Постирочная 4.65',
              4: 'Котельная 6.95',
              5: 'Общий с/у 5.90',
              6: 'Холл 4.99',
              7: 'Кухня-гостиная-столовая 34.88',
              8: 'Кинозал 10.53',
              9: 'Кабинет 9.91',
              10: 'Коридор 5.42',
              11: 'Мастер спальня 12.41',
              12: 'Мастер с/у 3.86',
              13: 'Мастер гардеробная 3.25',
              14: 'Детская спальня 1 13.36',
              15: 'Детская спальня 2 12.41',
              16: 'Терраса 20.14',
              17: 'Навес для 2 авто 40.90'
            },
            totalArea: 196.04
          }
        ]
      }
    ]
  },
  {
    id: 'nova-9',
    name: 'Nova-9',
    beds: 3,
    baths: 4,
    areaType: ProjectSize.m,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1Vy_xMJ03Y9J_fTun7IiUgDjCVlHY6C9r',
      '1P1zmPIMR7QTPPTi5MpsjSnkEDsfa4Y8H'
    ],
    implementationCost: {
      shell: 7650000,
      insulatedShell: 10800000,
      facade: 12450000,
      interiorFinishes: 16050000
    },
    variants: [
      {
        area: 150,
        constructionArea: 184,
        layouts: [
          {
            img: '1zbULZkwa-NQUVgVRojiWdkDFefaEIl9N',
            planWithArea: {
              1: 'Кухня-гостиная 47.51',
              2: 'Спальня 19.80',
              3: 'Спальня 15.40',
              4: 'Спальня 15.44',
              5: 'Гардероб 4.85',
              6: 'С/у 4.95',
              7: 'С/у 6.61',
              8: 'Холл 13.60',
              9: 'Топочная 10.75',
              10: 'Прихожая 11.04',
              11: 'Терраса 21.48',
              12: 'Крыльцо 4.72'
            },
            totalArea: 176.15
          }
        ]
      }
    ]
  },
  {
    id: 'nova-86',
    name: 'Nova-86',
    beds: 0,
    baths: 0,
    areaType: ProjectSize.xl,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      '1UwQl4w3Phc1N0yQ636ALkkkSuS8hBWHD',
      '15imlmQBGnhCwo_FcXSXhyV2IfWfNcYvj'
    ],
    implementationCost: {
      shell: 11950000,
      insulatedShell: 14150000,
      facade: 19350000,
      interiorFinishes: 26050000
    },
    variants: [
      {
        area: 248,
        constructionArea: 307,
        layouts: [
          {
            img: '1hLcK0Qo32e2dhlWQN9wUSlPZlXtRqBsC',
            planWithArea: {
              1: 'Прихожая/холл 13.70',
              2: 'Лестница 8.00',
              3: 'Гостиная/столовая 37.48',
              4: 'Кухня 17.32',
              5: 'Кладовая кухни 4.67',
              6: 'Кладовая 3.41',
              7: 'С/у 6.50',
              8: 'Гостевая спальня 15.00',
              9: 'Топочная/постирочная 8.30',
              10: 'Гардеробная для верх.од 6.51',
              11: 'Терраса 26.93',
              12: 'Навес для авто 52.12'
            },
            totalArea: 199.96
          },
          {
            img: '1skuwkQb9yCLNZNu--6LgC-SG4IrAJQvd',
            planWithArea: {
              1: 'Холл 11.85',
              2: 'Коридор 2.78',
              3: 'Родительская спальня 19.28',
              4: 'Гардеробная 6.47',
              5: 'С/у при спальне 7.09',
              6: 'Детская спальня 1 15.03',
              7: 'Детская спальня 2 14.38',
              8: 'Общий с/у 7.74',
              9: 'Второй свет 18.33',
              10: 'Рабочая зона 10.27',
              11: 'Балкон 13.67'
            },
            totalArea: 126.88
          }
        ]
      },
      {
        area: 258,
        constructionArea: 328,
        layouts: [
          {
            img: '1SQL2MkJu3eTKF2eK_Ix7em0SPrBBB7Yl',
            planWithArea: {
              1: 'Прихожая/холл 13.22',
              2: 'Лестница 8.34',
              3: 'Гостиная/столовая 37.96',
              4: 'Кухня 19.22',
              5: 'Кладовая кухни 4.34',
              6: 'Кладовая 3.17',
              7: 'С/у 6.50',
              8: 'Гостевая спальня 16.35',
              9: 'Топочная/постирочная 9.59',
              10: 'Гардеробная для верх.од 7.47',
              11: 'Терраса 34.23',
              12: 'Навес для авто 60.87',
              13: 'Крыльцо 2.52'
            },
            totalArea: 223.79
          },
          {
            img: '1fdBnLcLvNM3fg-JCzw2_1FQjydtmIHks',
            planWithArea: {
              1: 'Холл 12.04',
              2: 'Коридор 3.17',
              3: 'Родительская спальня 19.05',
              4: 'Гардеробная 6.98',
              5: 'С/у при спальне 7.03',
              6: 'Детская спальня 1 16.36',
              7: 'Детская спальня 2 15.86',
              8: 'Общий с/у 8.04',
              9: 'Второй свет 19.06',
              10: 'Рабочая зона 10.35',
              11: 'Балкон 13.32'
            },
            totalArea: 131.26
          }
        ]
      }
    ]
  }
];

export default projects;
