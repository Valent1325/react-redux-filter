import {
  createSlice,
  createAsyncThunk,
  AsyncThunk,
  createEntityAdapter,
  EntityAdapter,
  PayloadAction,
  createAction,
  createSelector,
  Dictionary
} from '@reduxjs/toolkit'

import { AppState } from '../store';
import { IFilter, IFilterOption, IFilterParam } from "../../models/filter";

import CatalogService from '../../services/catalog';

const filtersAdapter: EntityAdapter<IFilter> = createEntityAdapter<IFilter>({
  selectId: (filter: IFilter) => filter.slug,
  sortComparer: false
});

const catalogService = new CatalogService();

export const getFilters: AsyncThunk<IFilter[], void, {}> = createAsyncThunk(
  'filters/setFilters',
  async () => {
    const filters: IFilter[] = await catalogService.getFilters();
    return filters;
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersAdapter.getInitialState(),
  reducers: {
    setMarkedCheckboxes: (state, action: PayloadAction<IFilterParam>) => {
      const newOptions = JSON.parse(JSON.stringify(state.entities[action.payload.filterSlug]?.options))
      .map((option: IFilterOption) => {
        if (action.payload.optionSlug.includes(option.slug)) {
          option.isChecked = !option.isChecked;
        }
        return option;
      });
      return filtersAdapter.updateOne(state, { id: action.payload.filterSlug, changes: { options: newOptions } })
    },
    setPriceBorders: (state, action: PayloadAction<number[]>) => {
      return filtersAdapter.updateOne(state, { id: 'price', changes: { valueFrom: action.payload[0], valueTo: action.payload[1]}});
    }
  },
  extraReducers: {
    [getFilters.fulfilled.toString()]: (state, action) => {
      filtersAdapter.setAll(state, action)
    }
  }

});

export const filtersSelectors = filtersAdapter.getSelectors((state: AppState) => state.filters);

export const selectOptions = createSelector(filtersSelectors.selectEntities, (state: Dictionary<IFilter>) => {
  const res: any = {};
  for (const key in state) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      if (state[key]?.options && Array.isArray(state[key]?.options)) {
        res[key] = state[key]?.options.filter(vl => vl.isChecked).map(vl => vl.slug).join(',');
      }
      if (state[key]?.valueFrom) {
        res.priceFrom = state[key]?.valueFrom?.toString();
        res.priceTo = state[key]?.valueTo?.toString();
      }
    }
  }
  return res;
})

export const { setMarkedCheckboxes, setPriceBorders } = filtersSlice.actions;

export const makeRouteAfterChange = createAction('filters/makeRouteAfterChange');

export default filtersSlice;
