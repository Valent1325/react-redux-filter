import { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";

import { IFilter, IFilterOption } from "../../models/filter";
import { setMarkedCheckboxes } from "../../store/filter/filterSlice";

import './CheckboxOption.scss';

interface ICheckboxOptionProps {
  filter: IFilter;
  option: IFilterOption
}

const CheckboxOption: React.FC<ICheckboxOptionProps> = ({ filter, option }) => {

  const dispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    dispatch(setMarkedCheckboxes({filterSlug: filter.slug, optionSlug: [option.slug]}));
  }, [filter.slug, option.slug, dispatch])

  const toggleCheckbox = (slug: string, event: any): void => {
    console.log('slug', slug);
    console.log('event', event);
    event?.stopPropagation();
    if (filter) {
      dispatch(setMarkedCheckboxes({ filterSlug: filter.slug, optionSlug: [slug] }));
      // dispatch(makeRouteAfterChange());
    }
  }

  return (
    <div className="filter-body" onClick={(event) => toggleCheckbox(option.slug, event)}>
      <div className="filter-body__checkbox">
        <input
          type="checkbox"
          id={option.name}
          defaultChecked={option.isChecked}
        />
        <span className="filter-body__checkbox__icon">
          <span className="icon icon--checkbox"></span>
        </span>
      </div>
      <label className="filter-body__label" htmlFor={option.name}>
        {
          filter.type === 'color' ?
            <span className="filter-body__label__color" style={{backgroundColor: option.color}}></span>
            : null
        }
        <span className="filter-body__label__name">
          {option.name}
          <span className="filter-body__label__badge">
            {option.productsCount}
          </span>
        </span>
      </label>
    </div>
  )
}

export default CheckboxOption;
