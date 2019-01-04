import React from "react";
import CallApi from "../../api/api";
import Genres from "./Genres";
import { observer, inject } from "mobx-react";

@inject(({ moviesPageStore }) => ({ moviesPageStore }))
@observer
class GenresContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      genres: []
    };
  }

  componentDidMount() {
    CallApi.get("/genre/movie/list", { params: { language: "ru - RU" } }).then(
      data => {
        this.setState({
          genres: data.genres
        });
      }
    );
  }

  onChange = event => {
    this.props.moviesPageStore.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [
              ...this.props.moviesPageStore.filters.with_genres,
              event.target.value
            ]
          : this.props.moviesPageStore.filters.with_genres.filter(
              genre => genre !== event.target.value
            )
      }
    });
  };

  resetGenres = () => {
    this.props.moviesPageStore.onChangeFilters({
      target: {
        name: "with_genres",
        value: []
      }
    });
  };

  render() {
    const { genres } = this.state;
    const { with_genres } = this.props.moviesPageStore.filters;
    return (
      <Genres
        genres={genres}
        with_genres={with_genres}
        resetGenres={this.resetGenres}
        onChange={this.onChange}
      />
    );
  }
}
export default GenresContainer;
