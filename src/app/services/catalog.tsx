import { IFilter } from "../models/filter";
import { IPhonesGetPayload, IPhonesResponse } from "../models/phone";

export default class CatalogService {

  private _apiUrl: string = 'http://localhost:3600';

  public getFilters = async (): Promise<IFilter[]> => {
    const response = await fetch(`${this._apiUrl}/filters`);
    return response.json();
  }

  public getPhones = async (payload?: IPhonesGetPayload): Promise<IPhonesResponse> => {
    const filter = {};

    if (payload && payload.filters && payload.filters.length > 0) {
      payload.filters.forEach((filterValue) => {
        Object.assign(filter, {
          [`filters.${filterValue.name}`]: filterValue.value
        });
      });
    };

    const response = await fetch(
      `${this._apiUrl}/phones?`+
      (payload
        ? new URLSearchParams({
            _page: payload.page ? payload.page : '1',
            _limit: payload.limit ? payload.limit : '10',
            ...(payload.sort ? { _sort: payload.sort } : { _sort: 'createdDate' }),
            ...(payload.order ? { _order: payload.order } : { _order: 'desc' }),
            ...((payload.filters && payload.filters.length > 0) && filter),
            ...(payload.priceFrom && { newPrice_gte: payload.priceFrom }),
            ...(payload.priceTo && { newPrice_lte: payload.priceTo })
          }).toString()
        : new URLSearchParams({
            _page: '1',
            _limit: '10',
            _sort: 'createdDate',
            _order: 'desc',
          }).toString()
      )
    );

    const phones = await response.json();
    const total: string | null = response.headers.get('x-total-count');

    return {
      total: total ? +total : 0,
      data: phones ?? [],
    }
  }
}
