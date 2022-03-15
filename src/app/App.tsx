import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { getFilters } from './store/filter/filterSlice';

import CatalogPage from "./page/CatalogPage";

const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilters());
  }, [dispatch])

  return (
    <CatalogPage />
  )
}

export default App;
