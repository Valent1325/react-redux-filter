import React, { useState } from "react";

import InputRange from "../InputRange/InputRange";

import './FilterItem.scss';

import { IFilter, IFilterOption } from "../../models/filter";
import CheckboxOption from "../CheckboxOption/CheckboxOption";

interface IFilterItemProps {
  filter: IFilter;
}

const FilterItem: React.FC<IFilterItemProps> = ({ filter }) => {

  const [isExpanded, setExpanded] = useState<boolean>(filter.isOpen);

  const toggleFilter = (): void => {
    setExpanded(prevIsExpanded => !prevIsExpanded);
  }

  const renderFilterItemContent = (filter: IFilter) => {
    switch(filter.type) {
      case 'range':
        return (
         <InputRange filter={filter} />
        )
      case 'common':
      case 'color':
      default :
          return (
            filter.options.map((option: IFilterOption) => {
              return (
                <CheckboxOption key={option.name} filter={filter} option={option}/>
              )
            })
          )
    }
  }

  return (
    <>
      <div className={isExpanded ? "filter-title opened" : "filter-title"} onClick={toggleFilter}>
        <span>{filter.name}</span>
      </div>
      <div className={"collapse" + (isExpanded ? "in" : "")}>
        {
          renderFilterItemContent(filter)
        }
      </div>
    </>
  )
}

export default FilterItem;
