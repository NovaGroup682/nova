import config from 'config';

import { ProjectItemType, ProjectSize } from 'types';

const bodyLink = `https://${config.storageId}.public.blob.vercel-storage.com`;

const projects: ProjectItemType[] = [
  {
    id: 'nova-1',
    name: 'Nova-1',
    beds: 4,
    baths: 3,
    areaType: ProjectSize.m,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      bodyLink + '/projects/nova-1/nova1-1.jpg',
      bodyLink + '/projects/nova-1/nova1-2.jpg'
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
          bodyLink +
            '/projects/nova-1/%D0%9F%D0%BB%D0%B0%D0%BD%201%20%D1%8D%D1%82%D0%B0%D0%B6%D0%B0.jpg'
        ]
      }
    ]
  },
  {
    id: 'nova-2',
    name: 'Nova-2',
    estimateFileLink:
      'https://drive.google.com/file/d/1m3pvKIay3wpoIuL6_jG7K1KpQbL8Ogo5/view?usp=sharing',
    beds: 4,
    baths: 3,
    areaType: ProjectSize.xl,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      bodyLink + '/projects/nova-2/nova2-1.jpg',
      bodyLink + '/projects/nova-2/nova2-2.jpg'
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
          bodyLink + '/projects/nova-2/nova2-floor-1.jpg',
          bodyLink + '/projects/nova-2/nova2-floor-2.jpg'
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
      bodyLink + '/projects/nova-3/nova3-1.jpg',
      bodyLink + '/projects/nova-3/nova3-2.jpg'
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
          bodyLink + '/projects/nova-3/nova3-floor-1.jpg',
          bodyLink + '/projects/nova-3/nova3-floor-2.jpg'
        ]
      }
    ]
  },
  {
    id: 'nova-4',
    name: 'Nova-4',
    beds: 0,
    baths: 0,
    areaType: ProjectSize.m,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      bodyLink + '/projects/nova-4/nova4-1.jpg',
      bodyLink + '/projects/nova-4/nova4-2.jpg'
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
          bodyLink + '/projects/nova-4/nova4-floor-1.jpg',
          bodyLink + '/projects/nova-4/nova4-floor-2.jpg'
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
      bodyLink + '/projects/nova-5/nova5-1.jpg',
      bodyLink + '/projects/nova-5/nova5-2.jpg',
      bodyLink + '/projects/nova-5/nova5-3.jpg'
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
          bodyLink + '/projects/nova-5/nova5-floor-1.jpg',
          bodyLink + '/projects/nova-5/nova5-floor-2.jpg'
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
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      bodyLink + '/projects/nova-6/nova6-1.jpg',
      bodyLink + '/projects/nova-6/nova6-2.jpg'
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
          bodyLink + '/projects/nova-6/nova6-floor-1.jpg',
          bodyLink + '/projects/nova-6/nova6-floor-2.jpg'
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
      bodyLink + '/projects/nova-7/nova7-1.jpg',
      bodyLink + '/projects/nova-7/nova7-2.jpg',
      bodyLink + '/projects/nova-7/nova7-3.jpg'
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
        layouts: [bodyLink + '/projects/nova-7/nova7-floor-1.jpg']
      }
    ]
  },
  {
    id: 'nova-8',
    name: 'Nova-8',
    beds: 0,
    baths: 0,
    areaType: ProjectSize.m,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      bodyLink + '/projects/nova-8/nova8-1.jpg',
      bodyLink + '/projects/nova-8/nova8-2.jpg',
      bodyLink + '/projects/nova-8/nova8-3.jpg'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    variants: [
      {
        area: 151,
        constructionArea: 0,
        layouts: [bodyLink + '/projects/nova-8/nova8-floor-1.jpg']
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
      bodyLink + '/projects/nova-9/nova9-1.jpg',
      bodyLink + '/projects/nova-9/nova9-2.jpg'
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
        layouts: [bodyLink + '/projects/nova-9/nova9-floor-1.jpg']
      }
    ]
  },
  {
    id: 'nova-10',
    name: 'Nova-10',
    beds: 3,
    baths: 2,
    areaType: ProjectSize.m,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      bodyLink + '/projects/nova-10/nova10-1.jpg',
      bodyLink + '/projects/nova-10/nova10-2.jpg'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    variants: [
      {
        area: 160,
        constructionArea: 0,
        layouts: [
          bodyLink + '/projects/nova-10/nova10-floor-1.jpg',
          bodyLink + '/projects/nova-10/nova10-floor-2.jpg'
        ]
      }
    ]
  },
  {
    id: 'nova-11',
    name: 'Nova-11',
    beds: 1,
    baths: 1,
    areaType: ProjectSize.m,
    floor: 1,
    projectPrice: 60000,
    price: 0,
    sliders: [
      bodyLink + '/projects/nova-11/nova11-1.jpg',
      bodyLink + '/projects/nova-11/nova11-2.jpg'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    variants: [
      {
        area: 160,
        constructionArea: 197,
        layouts: [bodyLink + '/projects/nova-11/nova11-floor-1.jpg']
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
      bodyLink + '/projects/nova-86/nova86-1.jpg',
      bodyLink + '/projects/nova-86/nova86-2.jpg'
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
          bodyLink + '/projects/nova-86/v1/nova86-floor-1-v1.jpg',
          bodyLink + '/projects/nova-86/v1/nova86-floor-2-v1.jpg'
        ]
      },
      {
        area: 258,
        constructionArea: 328,
        layouts: [
          bodyLink + '/projects/nova-86/v2/nova86-floor-1-v2.jpg',
          bodyLink + '/projects/nova-86/v2/nova86-floor-2-v2.jpg'
        ]
      }
    ]
  },
  {
    id: 'nova-97',
    name: 'Nova-97',
    beds: 0,
    baths: 0,
    areaType: ProjectSize.xl,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      bodyLink + '/projects/nova-97/nova97-1.jpg',
      bodyLink + '/projects/nova-97/nova97-2.jpg'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    variants: [
      {
        area: 254,
        constructionArea: 0,
        layouts: [
          bodyLink + '/projects/nova-97/nova97-floor-1.jpg',
          bodyLink + '/projects/nova-97/nova97-floor-2.jpg'
        ]
      }
    ]
  },
  {
    id: 'nova-99',
    name: 'Nova-99',
    beds: 0,
    baths: 0,
    areaType: ProjectSize.xl,
    floor: 2,
    projectPrice: 60000,
    price: 0,
    sliders: [
      bodyLink + '/projects/nova-99/nova99-1.jpg',
      bodyLink + '/projects/nova-99/nova99-2.jpg'
    ],
    implementationCost: {
      shell: 0,
      insulatedShell: 0,
      facade: 0,
      interiorFinishes: 0
    },
    variants: [
      {
        area: 308,
        constructionArea: 0,
        layouts: [
          bodyLink + '/projects/nova-99/v1/nova99-floor-1-v1.jpg',
          bodyLink + '/projects/nova-99/v1/nova99-floor-2-v1.jpg'
        ]
      }
    ]
  }
];

export default projects;
