import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Range, getTrackBackground } from 'react-range';

import { setPriceBorders } from "../../store/filter/filterSlice";
import { useDebounce } from '../../hooks/useDebounce';

import { IFilter } from "../../models/filter";

import './InputRange.scss';

interface IFilterItemProps {
  filter: IFilter;
}

const InputRange: React.FC<IFilterItemProps> = ({ filter }) => {

  const valueFrom = filter.valueFrom ? filter.valueFrom : filter.min;
  const valueTo = filter.valueTo ? filter.valueTo : filter.max;

  const STEP = 1565;
  const MIN = filter.min!;
  const MAX = filter.max!;

  const [values, setValues] = React.useState<number[]>([valueFrom!, valueTo!]);
  const dispatch = useDispatch();
  const debouncedValues = useDebounce(values, 500);

  useEffect(() => {
    if (debouncedValues[0] >= MIN && debouncedValues[1] <= MAX) {
      dispatch(setPriceBorders(debouncedValues));
    } else {
      if (debouncedValues[0] < MIN && debouncedValues[1] > MAX) {
        setValues([MIN, MAX]);
      }
      if (debouncedValues[0] < MIN) {
        setValues(pevState => [MIN, pevState[1]]);
      }
      if (debouncedValues[1] > MAX) {
        setValues(pevState => [pevState[0], MAX]);
      }
    }
  }, [debouncedValues, dispatch, MIN, MAX])

  const valueFromHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (+event.target.value < values[1]) {
      setValues(pevValues => [+event.target.value, pevValues[1]]);
    }
  };
  const valueToHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (+event.target.value > values[0]) {
      setValues(pevValues => [pevValues[0], +event.target.value]);
    }
  };

  const rangeHandler = (newValues: number[]): void => {
    setValues(newValues);
  }

  return (
    <div className="range">
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={rangeHandler}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="range__track"
          >
            <div
              ref={props.ref}
              style={{
                height: '12px',
                width: '100%',
                borderRadius: '5px',
                background: getTrackBackground({
                  values,
                  colors: ['rgba(120, 120, 120, 0.2)', '#f6c164', 'rgba(120, 120, 120, 0.2)'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center',
                position: 'relative'
              }}
            >
              <span style={{
                position: 'absolute',
                top: '20px',
                left: '-20px'
              }}>{MIN}</span>
              <span style={{
                position: 'absolute',
                top: '20px',
                right: '-20px'
              }}>{MAX}</span>
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} className="range__thumb">
          </div>
        )}
      />
      <output id="output">
        <div className="price-container">
          <input
            className="price-container__control"
            placeholder={String(MIN)}
            value={values[0]}
            onChange={valueFromHandler}
          />
          <span className="price-container__text">-</span>
          <input
            className="price-container__control"
            placeholder={String(MAX)}
            value={values[1]}
            onChange={valueToHandler}
          />
          <span className="price-container__text">₽</span>
        </div>
      </output>
    </div>
  );
}


export default InputRange;
