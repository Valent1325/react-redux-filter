import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, LocationState } from 'history';
// import { makeRouteMiddleware } from '../middlewares/makeRouteMiddleware';

import { setPhonesMiddleware } from '../middlewares/setPhonesMiddleware';

import filtersSlice from './filter/filterSlice';
import phonesSlice from './phone/phoneSlice';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    phones: phonesSlice.reducer,
    router: connectRouter<LocationState>(history)
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    routerMiddleware(history), setPhonesMiddleware,
  ),
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
