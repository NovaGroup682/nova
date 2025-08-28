import { ProjectItemType, ProjectSize } from 'types';

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
      'https://fzsvndvghhlh5mdb.public.blob.vercel-storage.com/projects/nova-1/%D0%A1%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20%D1%801_1%20%282%29.png',
      'https://fzsvndvghhlh5mdb.public.blob.vercel-storage.com/projects/nova-1/%D0%A1%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20%D1%802_2%20%282%29.png'
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
          'https://fzsvndvghhlh5mdb.public.blob.vercel-storage.com/projects/nova-1/%D0%9F%D0%BB%D0%B0%D0%BD%201%20%D1%8D%D1%82%D0%B0%D0%B6%D0%B0.jpg'
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
      'https://fzsvndvghhlh5mdb.public.blob.vercel-storage.com/projects/nova-2/camera_1.png',
      'https://fzsvndvghhlh5mdb.public.blob.vercel-storage.com/projects/nova-2/camera_2%20%284%29.png'
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
          'https://fzsvndvghhlh5mdb.public.blob.vercel-storage.com/projects/nova-2/%21CC%20%D1%81%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20240_1%20%D1%8D%D1%82%D0%B0%D0%B6.jpg',
          'https://fzsvndvghhlh5mdb.public.blob.vercel-storage.com/projects/nova-2/%21CC%20%D1%81%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B8%CC%86%20240_2%20%D1%8D%D1%82%D0%B0%D0%B6.jpg'
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
      'https://drive.google.com/file/d/1UwQl4w3Phc1N0yQ636ALkkkSuS8hBWHD/view?usp=sharing',
      'https://drive.google.com/file/d/15imlmQBGnhCwo_FcXSXhyV2IfWfNcYvj/view?usp=sharing'
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
          'https://drive.google.com/file/d/15SRhBRID08nRkmyQSnh5ltO9r8ISEx_Q/view?usp=sharing',
          'https://drive.google.com/file/d/1TLEpbz1fdXHifEEvZXkJDaMXn9md_Za1/view?usp=sharing'
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
      'https://drive.google.com/file/d/17wt7C9T_H5UpMARvHYkLSv5wSuyJ6dP5/view?usp=sharing',
      'https://drive.google.com/file/d/1L1H4iCMlVLXth1n1MfWk6pIuBAk7Zqhq/view?usp=sharing'
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
          'https://drive.google.com/file/d/1UCIWA9fS82fc-i2deEQO8l-LqOCJhpiO/view?usp=sharing',
          'https://drive.google.com/file/d/1Hdrw2iYzTrBJ54WAhR6MJSc7X_PqTE7j/view?usp=sharing'
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
      'https://drive.google.com/file/d/1hWcmfamPYnYSQ3K5X752-vT2gqMt8Emt/view?usp=sharing',
      'https://drive.google.com/file/d/1UlnT0ZGl2r-BGkf1-50jXJx80pUH35Vu/view?usp=sharing',
      'https://drive.google.com/file/d/1A3X4R9eaIs5zuA53sXfXWpDfKA-mEIVj/view?usp=sharing'
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
          'https://drive.google.com/file/d/1Dtof8FAF_-aob07CgruV_DcOUbpVsPM8/view?usp=sharing',
          'https://drive.google.com/file/d/1enmlj6-UjxPgzeZrBxJq0QABMIIQc9Dm/view?usp=sharing'
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
      'https://drive.google.com/file/d/1_XiWiGUCRPE6-QHGne1XIEgvwikJS9Wb/view?usp=sharing',
      'https://drive.google.com/file/d/1hRfWoGyoQUL3Iy62iwGxXGhAJ3GgV9ef/view?usp=sharing'
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
          'https://drive.google.com/file/d/1nDf_Yqjigep-J5IQvwWgSHQG80b_NDBl/view?usp=sharing',
          'https://drive.google.com/file/d/1JkFDsZqddhejPgADr8_KE2A4LQPxRaj-/view?usp=sharing'
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
      'https://drive.google.com/file/d/1vePstUVyOXQHrMRVw2Mp10moaryiCB4c/view?usp=sharing',
      'https://drive.google.com/file/d/1GuIzSDintZOThHJqli50m9YXEzMs-uuT/view?usp=sharing',
      'https://drive.google.com/file/d/1L1UW9Z58aIySsLJXW7s6VIV1tuFzN7jN/view?usp=sharing'
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
          'https://drive.google.com/file/d/1exr-B2TYyFQK_QkprhRlN-y574-TxpBh/view?usp=sharing'
        ]
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
      'https://drive.google.com/file/d/18VSFdvZYZOyxvtpkq8CEElzkN0rl_yln/view?usp=sharing',
      'https://drive.google.com/file/d/1YvZj7szaH5zrHVfFTVtrkVJEeG6QdTHF/view?usp=sharing',
      'https://drive.google.com/file/d/1ZWAS21rea86aF7XCk-dXkM1uo8w3-9qx/view?usp=sharing'
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
        layouts: [
          'https://drive.google.com/file/d/1kJwYAq4_q9JocfG0yMOKswu1rM0W0e6E/view?usp=sharing'
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
      'https://drive.google.com/file/d/1P1zmPIMR7QTPPTi5MpsjSnkEDsfa4Y8H/view?usp=sharing',
      'https://drive.google.com/file/d/1Vy_xMJ03Y9J_fTun7IiUgDjCVlHY6C9r/view?usp=sharing'
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
          'https://drive.google.com/file/d/10sKcWfrNIpIFCcA1MJRCplpbI2y85oEj/view?usp=sharing'
        ]
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
      'https://drive.google.com/file/d/1X65DCOWAbrJ3y5hHCIz6qjiMGTLDg3wP/view?usp=sharing',
      'https://drive.google.com/file/d/1Gvx6AXhdkVF4FUlWY5FD6476bkmoHqgw/view?usp=sharing'
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
          'https://drive.google.com/file/d/1kdrFMQy9ichWFL1Wel3VSY7Tkp8YmB_d/view?usp=sharing',
          'https://drive.google.com/file/d/1hIThrXhTFz4xfN031RQ4B2T3k_OMKgTL/view?usp=sharing'
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
      'https://drive.google.com/file/d/1UWD6o2ZJe7_gKUCScQ4CQzB2w1lymRF6/view?usp=sharing',
      'https://drive.google.com/file/d/1q1tgrNOjArztMA_7N20jvk1l5yzChHZF/view?usp=sharing'
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
        layouts: [
          'https://drive.google.com/file/d/1welZPMPR_yXh-7VjE2tPHJ9drG1gFDzC/view?usp=sharing'
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
      'https://drive.google.com/file/d/175iLKt29yl8elGEjW4_IkwvDwAVqxZuc/view?usp=sharing',
      'https://drive.google.com/file/d/1cilXRwgIHiJx3IrU4qUXk9fGoEX9tfo1/view?usp=sharing'
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
          'https://drive.google.com/file/d/19mQqG6aAOvvL5q19LO-ilbBjWxhcaFOx/view?usp=sharing',
          'https://drive.google.com/file/d/1VRm2VPnD3xjAvI1LTtYclqplMorIaNoD/view?usp=sharing'
        ]
      },
      {
        area: 258,
        constructionArea: 328,
        layouts: [
          'https://drive.google.com/file/d/1NSkmBH9xgkVrCsxPDpeBdZ-_fHUhhIyL/view?usp=sharing',
          'https://drive.google.com/file/d/1hOA-uC9ni5wTtE2zPvb6sr6iYSy3b5GZ/view?usp=sharing'
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
      'https://drive.google.com/file/d/1F91DEWUx5MEPxTK9NwGymyYBZCQc45eG/view?usp=sharing',
      'https://drive.google.com/file/d/1JkZ5NeIG9gCRGjbX5A7aURxZy1n4hOfw/view?usp=sharing'
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
          'https://drive.google.com/file/d/1jj0m5VvBIq_8k6GxQ0VYaP6Jv4WfIBg2/view?usp=sharing',
          'https://drive.google.com/file/d/1YQQyNy_5j09DhvLPL1kVxow-A-SgpEBP/view?usp=sharing'
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
      'https://drive.google.com/file/d/1k4Pi_ztg31qj_Dpv_x-gsJ9O163OM260/view?usp=sharing',
      'https://drive.google.com/file/d/1P4fgBeLaipkRuXoE2aWNphoZJEx2l3gF/view?usp=sharing'
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
          'https://drive.google.com/file/d/1t3QgsJylgraqH_4QmWb5GXihPtCQA2Zv/view?usp=sharing',
          'https://drive.google.com/file/d/1B4cgQVlT-nLBO4wPZTA97MjmWysGzjP_/view?usp=sharing'
        ]
      }
    ]
  }
];

export default projects;
