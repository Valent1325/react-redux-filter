import { Middleware } from "redux";

import CatalogService from "../services/catalog";

import { setPhones } from "../store/phone/phoneSlice";

export const setPhonesMiddleware: Middleware = storeAPI => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {

    const catalogService = new CatalogService();

    catalogService.getPhones().then(response => {
      return next(setPhones(response))
    });
  }
  return next(action)
}
