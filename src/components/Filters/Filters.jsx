import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";
import GenresContainer from "./GenresContainer";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class Filters extends React.Component {
  render() {
    return (
      <form className="mb-3">
        <span
          onClick={this.props.moviesPageStore.onClearFilters}
          className="btn btn-light border"
        >
          Сбросить фильтры
        </span>
        <SortBy />
        <PrimaryReleaseYear />
        <GenresContainer />
        <Pagination />
      </form>
    );
  }
}
export default Filters;
