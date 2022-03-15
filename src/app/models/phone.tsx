export interface IPhone {
  id: number;
  name: string;
  brandName: string;
  thumbImageUrlConverted: string;
  oldPrice: number;
  newPrice: number;
  isPreorder: boolean;
  preorderStartDate: string;
  isOutOfStock: boolean;
  isLatest: boolean;
  hasFreeDelivery: boolean;
  promo: string;
  urlSlug: string;
  parameters: IPhoneParameter[];
  rate: number;
  feedbackCount: number;
  filters: {
    [key: string]: string;
  };
}

export interface IPhoneParameter {
  name: string;
  value: string;
  type: PhoneParameterType;
  color: string;
}

export interface IPhonesGetPayload {
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
  priceFrom?: string;
  priceTo?: string;
  filters?: {
    name: string;
    value: string;
  }[];
}

export interface IPhonesResponse {
  total: number;
  data: IPhone[];
}

export enum PhonesDisplayType {
  LIST = 'list',
  TILE = 'tile',
}

export enum PhonesSortType {
  RATING = 'rating',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
}

export const enum PhoneParameterType {
  COMMON = 'common',
  COLOR = 'color',
}
