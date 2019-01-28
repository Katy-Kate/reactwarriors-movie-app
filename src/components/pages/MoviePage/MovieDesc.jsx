import React from "react";

export default class MovieDesc extends React.Component {
  render() {
    const bgHeader = {
      background: "#3f474d",
      backgroundImage: `url(https://image.tmdb.org/t/p/w500${
        this.props.movie.backdrop_path
      })`,
      color: "#fff",
      backgroundPosition: "center",
      backgroundSize: "cover",
      boxShadow: "inset 0px 0px 20px 500px #292d30c4"
    };
    const { movie } = this.props;

    return (
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

              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
