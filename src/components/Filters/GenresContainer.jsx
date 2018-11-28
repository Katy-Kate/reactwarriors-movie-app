import React from "react";
import { API_KEY_3, API_URL } from "../../api/api";
import Genres from "./Genres";

export default class GenresContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      genres: []
    };
  }

  componentDidMount() {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  }

  onChange = event => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [...this.props.with_genres, event.target.value]
          : this.props.with_genres.filter(genre => genre !== event.target.value)
      }
    });
  };

  resetGenres = () => {
    this.props.onChangeFilters({
      target: {
        name: "with_genres",
        value: []
      }
    });
  };

  render() {
    const { genres } = this.state;
    const { with_genres } = this.props;
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
