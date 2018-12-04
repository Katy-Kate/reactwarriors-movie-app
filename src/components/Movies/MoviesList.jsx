import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import AppContextHOC from "../HOC/AppContextHOC";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({ movies, toggleModal }) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem item={movie} toggleModal={toggleModal} />
        </div>
      );
    })}
  </div>
);
MoviesList.defaultProps = {
  movies: []
};
MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default AppContextHOC(MoviesHOC(MoviesList));
