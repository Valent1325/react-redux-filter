import React, { useState } from "react";
import { useSelector } from 'react-redux';

import { PhonesDisplayType, PhonesSortType } from "../../models/phone";
import { phonesSelectors } from "../../store/phone/phoneSlice";

import PhoneCard from "../PhoneCard/PhoneCard";

import "./Catalog.scss";

const Content: React.FC = () => {

  const [iconSortCalss, setIconSortClass] = useState<string>('icon--asc');
  const [mode, setMode] = useState<PhonesDisplayType>(PhonesDisplayType.LIST);
  const [sort, setSort] = useState<PhonesSortType | null>(null);

  const phones = useSelector(phonesSelectors);

  const phonesDisplayType = PhonesDisplayType;
  const phonesSortType = PhonesSortType;

  const changeModeHandler = (mode: PhonesDisplayType) => {
    setMode(mode);
    console.log('mode', mode);
  }

  const changeSortHandler = (sort: PhonesSortType | null) => {
    setSort(sort);
    setIconSortClass(sort === phonesSortType.PRICE_DESC ? 'icon--desc' : 'icon--asc');
    console.log('sort', sort);
  }

  return (
    <>
      <h1 className="title">Смартфоны</h1>
      <div className="catalog__presentation">
        <button
          type="button"
          className={`btn presentation__btn ${mode === PhonesDisplayType.LIST ? 'active' : null}`}
          onClick={() => changeModeHandler(phonesDisplayType.LIST)}
        >
          <span className="icon icon--list"></span>
        </button>
        <button
          type="button"
          className={`btn presentation__btn ${mode === PhonesDisplayType.TILE ? 'active' : null}`}
          onClick={() => changeModeHandler(phonesDisplayType.TILE)}>
          <span className="icon icon--tile"></span>
        </button>
        <span className="sort__label">Сортировать по</span>
        <button
          type="button"
          className={`btn sort__btn ${sort === phonesSortType.RATING ? 'active' : null}`}
          onClick={() => changeSortHandler(sort !== phonesSortType.RATING ? phonesSortType.RATING : null)}>
          Популярности
        </button>
        <button
          type="button"
          className="btn sort__btn"
          onClick={() => changeSortHandler(
            sort === phonesSortType.PRICE_ASC
              ? phonesSortType.PRICE_DESC
              : (sort === phonesSortType.PRICE_DESC ? null : phonesSortType.PRICE_ASC)
          )}>
          <span
            className={`icon ${iconSortCalss}`}
          >
          </span>
          Цене
        </button>
      </div>

      {
        phones
          ? (
              <div className="phones">
                {phones.data.map((phone) => {
                  return (
                    <div className="phone-card-container" key={phone.id}>
                      <PhoneCard phone={phone} />
                    </div>
                  )
                })}
              </div>
            )
          : null
      }
    </>
  );
}

export default Content;
