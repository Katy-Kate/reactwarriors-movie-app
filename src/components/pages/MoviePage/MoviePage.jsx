import React from "react";
import CallApi from "../../../api/api";
import MovieTabs from "./MovieTabs/MovieTabs";
import AppContextHOC from "../../HOC/AppContextHOC";
import Loader from "../../Loader";
import MovieDesc from "./MovieDesc";

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
    if (this.state.isLoading) {
      return <Loader type="balls" color="#007bff" />;
    } else {
      return (
        <div className="movie-page">
          <MovieDesc movie={movie} />
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
