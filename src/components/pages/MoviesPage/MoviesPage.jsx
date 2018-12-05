import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import AppContextHOC from "../../HOC/AppContextHOC";

class MoviesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "Все фильмы",
        with_genres: []
      },
      page: 1,
      total_pages: "",
      watchlistMovies: [],
      favoriteMovies: []
    };
  }

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;

    const newFilters = {
      ...this.state.filters,
      [name]: value
    };
    this.setState({
      filters: newFilters
    });
  };

  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages
    });
  };
  onClearFilters = () => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "Все фильмы",
        with_genres: []
      },
      page: 1,
      total_pages: ""
    });
  };

  render() {
    const { filters, page, total_pages } = this.state;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body filters">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters}
                  onClearFilters={this.onClearFilters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePagination={this.onChangePagination}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePagination={this.onChangePagination}
              toggleModal={this.toggleModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MoviesPage);
