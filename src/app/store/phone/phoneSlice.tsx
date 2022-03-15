import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

import { IPhone } from '../../models/phone';
import { AppState } from '../store';

interface IPhonesState {
  pending: boolean;
  error: boolean;
  data: IPhone[];
  total: number;
}

const initialState: IPhonesState = {
  pending: false,
  error: false,
  data: [],
  total: 0,
}

const phonesSlice = createSlice({
  name: 'phones',
  initialState: initialState,
  reducers: {
    getPhones: (state: IPhonesState): IPhonesState => {
      return {...state, pending: true};
    },

    setPhones: (state: IPhonesState, action: PayloadAction<{data: IPhone[], total: number}>) => {
      console.log('action', action);
      return {...state, data: action.payload.data, total: action.payload.total, error: false, pending: false};
    },

    setPhonesError: (state: IPhonesState) => {
      return {...state, error: true}
    }
  }
});

export const phonesSelectors = (state: AppState) => state.phones;

export const { getPhones, setPhones, setPhonesError } = phonesSlice.actions;

export default phonesSlice;
