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
  estimateFileLink?: string;
  beds: number;
  baths: number;
  areaType: ProjectSize;
  floor: number;
  projectPrice: number;
  price: number;
  sliders: string[];
  variants: {
    area: number;
    constructionArea: number;
    layouts: LayoutsPlanType[];
  }[];
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
