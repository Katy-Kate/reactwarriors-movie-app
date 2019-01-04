import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import AppContextHOC from "../HOC/AppContextHOC";
import MoviesHOC from "../HOC/MoviesHOC";
import { observer } from "mobx-react";

const MoviesList = observer(({ movies }) => (
  <div className="d-flex flex-wrap-reverse">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4 align-content-stretch">
          <MovieItem item={movie} />
        </div>
      );
    })}
  </div>
));
MoviesList.defaultProps = {
  movies: []
};
MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default AppContextHOC(MoviesHOC(MoviesList));
