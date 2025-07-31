export enum ProjectSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl'
}

export type LayoutsPlanType = {
  img: string;
  planWithArea: {
    [key: number]: string;
  };
  totalArea: number;
};

export type ProjectItemType = {
  id: string;
  name: string;
  area: number;
  beds: number;
  baths: number;
  areaType: ProjectSize;
  constructionArea: number;
  floor: number;
  projectPrice: number;
  price: number;
  sliders: string[];
  layouts: LayoutsPlanType[];
  implementationCost: {
    shell: number;
    insulatedShell: number;
    facade: number;
    interiorFinishes: number;
  };
};

export enum ProjectSearchKeys {
  area = 'area',
  floors = 'floors',
  minPrice = 'minPrice',
  maxPrice = 'maxPrice',
  projectName = 'projectName'
}
