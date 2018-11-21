import React from "react";
import SortBy from "./SortBy";
import PrimaryReLeaseYear from "./PrimaryReleaseYear";
import Genres from "./Genres";

export default class Filters extends React.Component {
  render() {
    const {
      page,
      filters: { sort_by, primary_release_year, with_genres },
      onChangeFilters,
      onChangePage,
      total_pages,
      onClearFilters,
      genres,
      onChangeGenres
    } = this.props;
    console.log("render Filters", this.props);
    return (
      <form className="mb-3">
        <button onClick={onClearFilters} className="btn btn-light border">
          Сбросить фильтры
        </button>
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <PrimaryReLeaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        />
        <Genres
          genres={genres}
          with_genres={with_genres}
          onChangeGenres={onChangeGenres}
          onChangeFilters={onChangeFilters}
        />
        <div className="btns-group">
          {/* <Pagination onChangePage={onChangePage} page={page} /> */}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              onChangePage(page - 1);
            }}
            disabled={page === 1}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              onChangePage(page + 1);
            }}
          >
            Вперед
          </button>
        </div>
        <p>
          {page} of {total_pages}
        </p>
      </form>
    );
  }
}
