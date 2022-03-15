export interface IFilters {
  [key: string]: IFilter
}

export interface IFilter {
  name: string;
  slug: string;
  type: FilterType;
  options: IFilterOption[];
  isOpen: boolean;
  valueFrom?: number;
  valueTo?: number;
  min?: number;
  max?: number;
}

export interface IFilterOption {
  name: string;
  slug: string;
  color: string;
  isChecked: boolean;
  isDisabled: boolean;
  productsCount: number;
}

export interface IFilterParam {
  filterSlug: string;
  optionSlug: string[];
}

export enum FilterType {
  RANGE = 'range',
  COMMON = 'common',
  COLOR = 'color',
}
