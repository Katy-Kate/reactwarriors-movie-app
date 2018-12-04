import React from "react";
import Favorite from "./Favorite";
import Watchlist from "./Watchlist";

export default class MovieItem extends React.Component {
  findAddedIcon = array => {
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === this.props.item.id) {
          return true;
        }
      }
    }
  };

  render() {
    const {
      item,
      session_id,
      user,
      toggleModal,
      watchlistMovies,
      favoriteMovies,
      getFavoriteMovies,
      getWatchlistMovies
    } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <div className="card-img--wrap">
          <img
            className="card-img-top card-img--height"
            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
              item.poster_path}`}
            alt=""
          />
        </div>
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="d-flex justify-content-between mt-3">
            <Watchlist
              toggleModal={toggleModal}
              item={item}
              session_id={session_id}
              user={user}
              isAdd={this.findAddedIcon(watchlistMovies) ? true : false}
              name="watchlist"
              getFavoriteMovies={getFavoriteMovies}
              getWatchlistMovies={getWatchlistMovies}
            />
            <Favorite
              toggleModal={toggleModal}
              item={item}
              session_id={session_id}
              user={user}
              isAdd={this.findAddedIcon(favoriteMovies) ? true : false}
              name="favorite"
              getFavoriteMovies={getFavoriteMovies}
              getWatchlistMovies={getWatchlistMovies}
            />
          </div>
        </div>
      </div>
    );
  }
}
