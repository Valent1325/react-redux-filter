import { createSelector } from "@reduxjs/toolkit";
import { RouterState } from "connected-react-router";
import { AppState } from "../store";

export const selectRouter = (state: AppState) => state.router;

export const selectRouterQueryParams = createSelector(selectRouter, (state: RouterState) => {
  return state.location.query;
});
