import React from "react";
import Favorite from "./Favorite";
import Watchlist from "./Watchlist";
import { Link } from "react-router-dom";
const hoc = c => console.log("hoc----");

class MovieItem extends React.Component {
  render() {
    const { item, toggleModal } = this.props;
    return (
      <div className="card " style={{ width: "100%" }}>
        <div className="card-img--wrap">
          <img
            className="card-img-top card-img--height"
            src={
              item.backdrop_path || item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
                    item.poster_path}`
                : "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg"
            }
            alt={item.title}
          />
        </div>
        <div className="card-body">
          <Link to={`movie/${item.id}`} className="card-title">
            {item.title}
          </Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <div className="d-flex justify-content-between mt-3">
            <Watchlist toggleModal={toggleModal} item={item} name="watchlist" />
            <Favorite toggleModal={toggleModal} item={item} name="favorite" />
          </div>
        </div>
      </div>
    );
  }
}
export default hoc(MovieItem);
