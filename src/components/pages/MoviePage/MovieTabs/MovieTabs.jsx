import React from "react";
import { Nav, NavItem } from "reactstrap";
import { Route, Switch, Link } from "react-router-dom";
import classnames from "classnames";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";
import MovieDetail from "./MovieDetail";

export default class MovieTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: ""
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  render() {
    return (
      <div className="container ">
        <Nav tabs>
          <NavItem>
            <Link
              to={`/movie/${this.props.movieId}/detail`}
              className={
                `nav-link ` +
                classnames({ active: this.state.activeTab === "detail" })
              }
              onClick={() => {
                this.toggle("detail");
              }}
            >
              Детали
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to={`/movie/${this.props.movieId}/videos`}
              className={
                `nav-link ` +
                classnames({ active: this.state.activeTab === "videos" })
              }
              onClick={() => {
                this.toggle("videos");
              }}
            >
              Видео
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to={`/movie/${this.props.movieId}/credits`}
              className={
                `nav-link ` +
                classnames({ active: this.state.activeTab === "credits" })
              }
              onClick={() => {
                this.toggle("credits");
              }}
            >
              Актеры
            </Link>
          </NavItem>
        </Nav>
        <Switch>
          <Route
            path="/movie/:id/detail"
            render={props => (
              <MovieDetail
                {...props}
                movieId={this.props.movieId}
                movie={this.props.movie}
              />
            )}
          />
          <Route
            path="/movie/:id/videos"
            render={props => (
              <MovieVideos {...props} movieId={this.props.movieId} />
            )}
          />
          <Route
            path="/movie/:id/credits"
            render={props => (
              <MovieCredits {...props} movieId={this.props.movieId} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
