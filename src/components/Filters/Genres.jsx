import React from "react";
import PropTypes from "prop-types";

const Genres = ({ genres, with_genres, resetGenres, onChange }) => (
  <React.Fragment>
    <div>
      <button
        type="button"
        className="btn btn-outline-dark mb-2"
        onClick={resetGenres}
      >
        Показать все жанры
      </button>
    </div>
    {genres.map(genre => (
      <div key={genre.id} className="form-group form-check">
        <input
          type="checkbox"
          value={genre.id}
          id={`genre${genre.id}`}
          onChange={onChange}
          checked={with_genres.includes(String(genre.id))}
        />
        <label className="form-check-label" htmlFor={`genre${genre.id}`}>
          {genre.name}
        </label>
      </div>
    ))}
  </React.Fragment>
);
Genres.defaultProps = {
  genres: []
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired
};

export default Genres;
