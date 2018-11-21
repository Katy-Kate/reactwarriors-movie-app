import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filters: {
        sort_by: "vote_average.desc",
        primary_release_year: "release_year",
        with_genres: " "
      },
      page: 1,
      total_pages: 2,
      genres: []
    };
  }
  onChangeGenres = genres => {
    this.setState({
      genres
    });
  };
  onClearFilters = () => {
    this.setState({
      filters: {
        sort_by: "vote_average.desc",
        primary_release_year: "release_year",
        with_genres: " "
      },
      page: 1,
      total_pages: 2,
      genres: []
    });
  };
  onChangePage = (page, total_pages) => {
    console.log("onChangePage APP(new page)");
    this.setState({
      page,
      total_pages
    });
  };

  onChangeFilters = event => {
    console.log("onChangeFilters APP (new filters)");
    const name = event.target.name;
    const value = event.target.value;
    const newFilters = {
      ...this.state.filters,
      [name]: value
    };
    this.setState({
      filters: newFilters
    });
  };
  getTotalPages = total_pages => {
    this.setState({
      total_pages
    });
  };
  render() {
    console.log("render APP", this.props);
    const { filters, total_pages, genres, page } = this.state;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  page={page}
                  total_pages={total_pages}
                  onClearFilters={this.onClearFilters}
                  genres={genres}
                  onChangeGenres={this.onChangeGenres}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={this.state.page}
              onChangePage={this.onChangePage}
              total_pages={total_pages}
              getTotalPages={this.getTotalPages}
              onChangeGenres={this.onChangeGenres}
            />
          </div>
        </div>
      </div>
    );
  }
}
