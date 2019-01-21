import React from "react";
import Favorite from "./Favorite";
import Watchlist from "./Watchlist";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

@observer
class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
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
            {/* <Watchlist item={item} name="watchlist" />
            <Favorite item={item} name="favorite" /> */}
          </div>
        </div>
      </div>
    );
  }
}
export default MovieItem;
