import React from "react";
import IconsAddmovie from "./IconsAddMovie/IconsAddmovie";

export default class MovieItem extends React.Component {
  // onChangeFavorite = name => () => {
  //   //при онклике меняется состояние иконки
  // };

  render() {
    const { item, session_id, toggleModal, user, media_id } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <IconsAddmovie
            onClickFavorite={this.onClickFavorite}
            session_id={session_id}
            toggleModal={toggleModal}
            user={user}
            media_id={media_id}
            item={item}
          />
        </div>
      </div>
    );
  }
}
