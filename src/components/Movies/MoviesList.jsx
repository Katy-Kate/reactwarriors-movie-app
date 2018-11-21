import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }
  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&year=${primary_release_year}&with_genres=${with_genres}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.props.getTotalPages(data.total_pages);
        console.log("total_pages", data);
        this.setState({
          movies: data.results
        });
      });
  };
  getGenre = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // this.props.getTotalPages(data.total_pages);
        console.log("genre", data.genres);

        this.props.onChangeGenres(data.genres);
      });
  };
  componentDidMount() {
    //вызывается после рендеринга
    this.getMovies(this.props.filters, 1);
    console.log("componentDidMount", this.props.filters);
    this.getGenre();
  }
  // componentWillReceiveProps(nextProps) {
  //   this.getMovies(nextProps.filters);
  // }
  componentDidUpdate(prevProps) {
    //вызыв. сразу после обновления компонента
    console.log("componentDidUpdate", prevProps.page, this.props.page);
    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      console.log("componentDidUpdate change filters");
      this.props.onChangePage(1);
      console.log("componentDidUpdate onChangePage(1)");
      this.getMovies(this.props.filters, this.props.page);
    }
    if (this.props.page !== prevProps.page) {
      console.log("componentDidUpdate change page");
      this.getMovies(this.props.page, this.props.page);
    }
    if (
      this.props.filters.primary_release_year !==
      prevProps.filters.primary_release_year
    ) {
      this.getMovies(this.props.filters, this.props.primary_release_year);
    }
    if (this.props.filters.with_genres !== prevProps.filters.with_genres) {
      this.getMovies(this.props.filters, this.props.with_genres);
    }
  }
  render() {
    const { movies } = this.state;
    console.log("movies", movies);
    console.log("render MovieList", this.props);
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
