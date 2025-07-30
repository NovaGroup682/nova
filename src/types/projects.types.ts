export enum ProjectSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl'
}

export type ProjectItemType = {
  id: string;
  name: string;
  area: number;
  areaType: ProjectSize;
  constructionArea: number;
  floor: number;
  projectPrice: number;
  price: number;
  sliders: string[];
  layouts: string[];
};

export enum ProjectSearchKeys {
  area = 'area',
  floors = 'floors',
  minPrice = 'minPrice',
  maxPrice = 'maxPrice'
}
