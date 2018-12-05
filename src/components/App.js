import React from "react";
import Header from "./Header/Header";
import Login from "./Login/Login";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { BrowserRouter, Route, Link } from "react-router-dom";

const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      showLoginModal: false,
      watchlistMovies: [],
      favoriteMovies: []
    };
  }

  updateUser = user => {
    this.setState({
      user
    });
  };
  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;

    const newFilters = {
      ...this.state.filters,
      [name]: value
    };
    this.setState({
      filters: newFilters
    });
  };
  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });

    this.setState({
      session_id
    });
  };
  logOut = () => {
    CallApi.delete("/authentication/session", {
      params: { session_id: this.state.session_id }
    }).then(() => {
      this.setState({
        session_id: null,
        user: null,
        watchlistMovies: [],
        favoriteMovies: []
      });
      cookies.remove("session_id");
      console.log("logout");
    });
  };

  componentDidMount = () => {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", { params: { session_id: session_id } })
        .then(user => {
          this.updateUser(user);
          this.updateSessionId(session_id);
        })
        .then(() => {
          this.getFavoriteMovies();
          this.getWatchlistMovies();
        });
    }
  };

  getFavoriteMovies = () => {
    if (this.state.user) {
      console.log("getFavoriteMovies");
      CallApi.get(`/account/${this.state.user.account_id}/favorite/movies`, {
        params: { session_id: this.state.session_id }
      }).then(data => {
        this.setState({
          favoriteMovies: [...data.results]
        });
      });
    } else {
      console.log("we don't have user");
    }
  };
  getWatchlistMovies = () => {
    if (this.state.user) {
      CallApi.get(`/account/${this.state.user.account_id}/watchlist/movies`, {
        params: { session_id: this.state.session_id }
      }).then(data => {
        this.setState({
          watchlistMovies: [...data.results]
        });
      });
    } else {
      console.log("we don't have user");
    }
  };

  render() {
    const {
      user,
      session_id,
      showLoginModal,
      watchlistMovies,
      favoriteMovies
    } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            updateSessionId: this.updateSessionId,
            updateUser: this.updateUser,
            session_id: session_id,
            watchlistMovies: watchlistMovies,
            favoriteMovies: favoriteMovies,
            getFavoriteMovies: this.getFavoriteMovies,
            getWatchlistMovies: this.getWatchlistMovies
          }}
        >
          <Header
            user={user}
            showLoginModal={showLoginModal}
            toggleModal={this.toggleModal}
            session_id={this.state.session_id}
            logOut={this.logOut}
          />

          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />

          <Login
            toggleModal={this.toggleModal}
            showLoginModal={this.state.showLoginModal}
          />
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
