import React from "react";
import Favorite from "./Favorite";
import Watchlist from "./Watchlist";

export default class MovieItem extends React.Component {
  render() {
    const { item, toggleModal } = this.props;
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
              // session_id={session_id}
              // user={user}
              name="watchlist"
            />
            <Favorite
              toggleModal={toggleModal}
              item={item}
              // session_id={session_id}
              //user={user}
              name="favorite"
            />
          </div>
        </div>
      </div>
    );
  }
}
