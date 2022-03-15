import React from 'react';
import { useSelector } from 'react-redux';

import { filtersSelectors } from '../../store/filter/filterSlice';

import FilterItem from '../FilterItem/FilterItem';

import './FilterList.scss';

const FilterList: React.FC = () => {

  const filters = useSelector(filtersSelectors.selectEntities);

  return (
    <div className="filter-list">
      <h2 className="filter-list__title">
        Фильтры
        <span className="icon icon--filter"></span>
      </h2>

      {
        Object.entries(filters).map(filter => {
          return (
            <div className="filter-list__item" key={filter[0]}>
              <FilterItem filter={filter[1]!} />
            </div>
          )
        })
      }
    </div>
  );
}

export default FilterList;
