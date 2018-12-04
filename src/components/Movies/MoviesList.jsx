import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({
  movies,
  toggleModal,
  session_id,
  user,
  watchlistMovies,
  favoriteMovies,
  getFavoriteMovies,
  getWatchlistMovies
}) => (
  <div className="row">
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem
            item={movie}
            toggleModal={toggleModal}
            session_id={session_id}
            user={user}
            watchlistMovies={watchlistMovies}
            favoriteMovies={favoriteMovies}
            getFavoriteMovies={getFavoriteMovies}
            getWatchlistMovies={getWatchlistMovies}
          />
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

export default MoviesHOC(MoviesList);
