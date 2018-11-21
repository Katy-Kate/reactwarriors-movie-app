import React from "react";
import { API_KEY_3, API_URL } from "../../api/api";

export default class Genres extends React.Component {
  onChangeGenres = (genre, with_genres) => {
    if (genre ) {
      return console.log("Genre", genre);
    }
  };
  render() {
    const { genres, with_genres } = this.props;
    return (
      <div className="form-group">
        {genres.map(genre => {
          return (
            <div className="form-group form-check">
              <input
                key={genre.id}
                onChange={this.onChangeGenres(genre.id, with_genres)}
                type="checkbox"
                name="sort_genre"
                value={with_genres}
              />
              <label htmlFor="sort_by">{genre.name}</label>
            </div>
          );
        })}
      </div>
    );
  }
}
