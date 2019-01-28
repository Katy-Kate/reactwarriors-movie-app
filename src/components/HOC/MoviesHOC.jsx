import React from "react";
import Loader from "../Loader";
import { inject, observer } from "mobx-react";

export default Component =>
  @inject("moviesPageStore")
  @observer
  class MoviesHOC extends React.Component {
    componentDidMount() {
      this.props.moviesPageStore.getMovies();
    }
    render() {
      const {
        moviesPageStore: { movies, isLoading }
      } = this.props;
      return isLoading ? (
        <Loader type="balls" color="#007bff" />
      ) : (
        <Component {...this.props} movies={movies} />
      );
    }
  };
