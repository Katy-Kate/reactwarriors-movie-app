import React from "react";
import { observer, inject } from "mobx-react";

const Genres = inject("moviesPageStore")(
  observer(props => (
    <React.Fragment>
      <div>
        <button
          type="button"
          className="btn btn-outline-dark mb-2"
          onClick={props.moviesPageStore.resetGenres}
        >
          Показать все жанры
        </button>
      </div>

      {props.moviesPageStore.genres.map(genre => (
        <div key={genre.id} className="form-group form-check">
          <input
            type="checkbox"
            value={genre.id}
            id={`genre${genre.id}`}
            onChange={props.moviesPageStore.onChangeGenres}
            checked={props.moviesPageStore.filters.with_genres.includes(
              String(genre.id)
            )}
          />
          <label className="form-check-label" htmlFor={`genre${genre.id}`}>
            {genre.name}
          </label>
        </div>
      ))}
    </React.Fragment>
  ))
);

export default Genres;
