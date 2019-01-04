import React from "react";
import CallApi from "../../api/api";
import _ from "lodash";
import Loader from "../Loader";
import { inject, observer } from "mobx-react";

export default Component =>
  @inject(({ moviesPageStore }) => ({
    moviesPageStore
  }))
  @observer
  class MoviesHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        movies: [],
        isLoading: false
      };
    }
    getMovies = (filters, page) => {
      const { sort_by, primary_release_year, with_genres } = filters;
      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year
      };

      this.setState({
        isLoading: true
      });
      if (with_genres.length > 0) {
        queryStringParams.with_genres = with_genres.join(",");
      }
      CallApi.get("/discover/movie", { params: queryStringParams }).then(
        data => {
          this.props.moviesPageStore.onChangePagination({
            page: data.page,
            total_pages: data.total_pages
          });
          this.setState({
            movies: data.results,
            isLoading: false
          });
        }
      );
    };

    componentDidMount() {
      this.getMovies(
        this.props.moviesPageStore.filters,
        this.props.moviesPageStore.page
      );
    }
    componentDidUpdate(prevProps) {
      if (
        !_.isEqual(
          this.props.moviesPageStore.filters,
          prevProps.moviesPageStore.filters
        )
      ) {
        this.props.moviesPageStore.onChangePagination({ page: 1 });
        this.getMovies(this.props.moviesPageStore.filters, 1);
      }

      if (this.props.page !== prevProps.page) {
        this.getMovies(
          this.props.moviesPageStore.filters,
          this.props.moviesPageStore.page
        );
      }
    }

    render() {
      const { movies, isLoading } = this.state;
      if (isLoading) {
        return <Loader type="balls" color="#007bff" />;
      }
      return <Component {...this.props} movies={movies} />;
    }
  };
