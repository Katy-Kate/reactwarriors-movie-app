import React from "react";
import CallApi from "../../../../api/api";

export default class MovieVideos extends React.Component {
  constructor() {
    super();
    this.state = {
      videos: []
    };
  }

  componentDidMount = () => {
    if (this.props.movieId) {
      CallApi.get(`/movie/${this.props.movieId}/videos`, {
        params: { language: "en-US" }
      }).then(data => {
        this.setState({
          videos: data.results
        });
      });
    }
  };

  render() {
    if (this.state.videos.length > 0) {
      return (
        <div className="row">
          {this.state.videos.map(video => {
            return (
              <div key={video.id} className="col-xs-12 col-sm-3">
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.name}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}
