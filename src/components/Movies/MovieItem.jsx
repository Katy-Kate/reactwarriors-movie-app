import React from "react";
//import IconsAddmovie from "./IconsAddMovie/IconsAddmovie";
import IconsContainer from "../Movies/IconsAddMovie/IconsContainer";

export default class MovieItem extends React.Component {
  render() {
    const { item, toggleModal, media_id, session_id, user } = this.props;
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
          {/* <IconsAddmovie
            toggleModal={toggleModal}
            media_id={media_id}
            item={item}
          /> */}
          <IconsContainer
            toggleModal={toggleModal}
            media_id={media_id}
            item={item}
            session_id={session_id}
            user={user}
          />
        </div>
      </div>
    );
  }
}
