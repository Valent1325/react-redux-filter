import { useSelector } from "react-redux";
import { Middleware } from "redux";

import { selectOptions } from "../store/filter/filterSlice";
import { selectRouterQueryParams } from "../store/router/routerSelectors";

import { history } from '../store/store';

export const makeRouteMiddleware: Middleware = storeAPI => next => action => {
  if (action.type === 'filters/makeRouteAfterChange') {

    // const options = useSelector(selectOptions);
    // console.log('storeAPI', storeAPI.getState().filters);

    // const routerQueryParams = useSelector(selectRouterQueryParams);


    // if (routerQueryParams?.page) {
    //   options.page = routerQueryParams.page;
    // }
    // if (routerQueryParams?.sort) {
    //   options.sort = routerQueryParams.sort;
    // }
    // if (routerQueryParams?.order) {
    //   options.order = routerQueryParams.order;
    // }
    // history.push('localhost:4200/', {queryParams: options});
    // return FiltersActions.navigateSuccess();
  }
  return next(action)
}
