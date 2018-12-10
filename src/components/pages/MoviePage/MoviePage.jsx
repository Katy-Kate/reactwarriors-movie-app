import React from "react";
import CallApi from "../../../api/api";
import Favorite from "../../Movies/Favorite";
import Watchlist from "../../Movies/Watchlist";
import MovieTabs from "./MovieTabs/MovieTabs";
import AppContextHOC from "../../HOC/AppContextHOC";
import Loader from "../../Loader";

class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      isLoading: true
    };
  }
  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`).then(data => {
      this.setState({
        movie: data,
        isLoading: false
      });
    });
  }
  render() {
    const { movie } = this.state;
    const bgHeader = {
      background: "#3f474d",
      backgroundImage: `url(https://image.tmdb.org/t/p/w500${
        this.state.movie.backdrop_path
      })`,
      color: "#fff",
      backgroundPosition: "center",
      backgroundSize: "cover",
      boxShadow: "inset 0px 0px 20px 500px #292d30c4"
    };

    if (this.state.isLoading) {
      return <Loader type="balls" color="#007bff" />;
    } else {
      return (
        <div className="movie-page">
          <div className="movie_header--wraper" style={bgHeader}>
            <div className="container ">
              <div className="movie_header p-3 row align-items-start ">
                <div className="movie_header__poster col-xs-12 col-md-4 ">
                  <img
                    className="w-100"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://lajoyalink.com/wp-content/uploads/2018/03/Movie.jpg"
                    }
                    alt={movie.title}
                  />
                </div>
                <div className="movie_header__overview col-xs-12 col-md-8">
                  <h2 className="movie_title ">{movie.original_title}</h2>
                  <div className="row movie_icons d-flex justify-content-around p-4">
                    <div className="movie-page_icon">
                      <Favorite item={movie} name="favorite" />
                    </div>
                    <div className="movie-page_icon">
                      <Watchlist item={movie} name="watchlist" />
                    </div>
                  </div>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <MovieTabs
            movieId={this.props.match.params.id}
            movie={this.state.movie}
          />
        </div>
      );
    }
  }
}

export default AppContextHOC(MoviePage);
