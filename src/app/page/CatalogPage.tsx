import React from 'react';

import Catalog from '../components/Catalog/Catalog';
import FilterList from "../components/FilterList/FilterList";

import './CatalogPage.scss';

const CatalogPage: React.FC = () => {
  return (
    <main className="catalog">
      <section className="catalog-filter">
        <FilterList />
      </section>
      <section className="catalog-content">
        <Catalog />
      </section>
    </main>
  );
}

export default CatalogPage;
