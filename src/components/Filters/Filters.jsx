import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";
import GenresContainer from "./GenresContainer";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, primary_release_year, with_genres },
      page,
      total_pages,
      onClearFilters,
      onChangeFilters,
      onChangePagination
    } = this.props;

    return (
      <form className="mb-3">
        <span onClick={onClearFilters} className="btn btn-light border">
          Сбросить фильтры
        </span>
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <PrimaryReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <GenresContainer
          with_genres={with_genres}
          onChangeFilters={onChangeFilters}
        />
        <Pagination
          page={page}
          total_pages={total_pages}
          onChangePagination={onChangePagination}
        />
      </form>
    );
  }
}
