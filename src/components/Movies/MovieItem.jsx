import React from "react";
import Favorite from "./Favorite";
import Watchlist from "./Watchlist";

export default class MovieItem extends React.Component {
  render() {
    const { item, session_id, user, media_id, toggleModal } = this.props;
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
              media_id={media_id}
              item={item}
              session_id={session_id}
              user={user}
            />
            <Favorite
              toggleModal={toggleModal}
              media_id={media_id}
              item={item}
              session_id={session_id}
              user={user}
            />
          </div>
        </div>
      </div>
    );
  }
}
