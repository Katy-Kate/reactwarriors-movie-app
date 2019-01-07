import React from "react";
import Header from "./Header/Header";
import Login from "./Login/Login";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { BrowserRouter, Route } from "react-router-dom";
import _ from "lodash";

const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      showLoginModal: false,
      watchlist: [],
      favorite: []
    };
  }
  toggleModal = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }));
  };

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
    cookies.remove("session_id", { path: "/" });
    CallApi.delete("/authentication/session", {
      params: { session_id: this.state.session_id }
    }).then(() => {
      this.setState({
        session_id: null,
        user: null,
        watchlist: [],
        favorite: []
      });

      console.log("logout");
    });
  };

  componentDidMount = () => {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: { session_id: session_id }
      }).then(user => {
        this.updateUser(user);
        this.updateSessionId(session_id);
        this.getListAddedMovies("favorite");
        this.getListAddedMovies("watchlist");
      });
    }
  };

  getListAddedMovies = type => {
    if (this.state.user && this.state.session_id) {
      CallApi.get(`/account/${this.state.user.id}/${type}/movies`, {
        params: { session_id: this.state.session_id }
      }).then(data => {
        this.setState({
          [type]: [...data.results]
        });
      });
    } else {
      console.log("we don't have user");
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      !_.isEqual(this.state.user, prevState.user) &&
      prevState.user === null
    ) {
      this.getListAddedMovies("favorite");
      this.getListAddedMovies("watchlist");
    }
  };
  render() {
    const {
      user,
      session_id,
      showLoginModal,
      watchlist,
      favorite
    } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            updateSessionId: this.updateSessionId,
            updateUser: this.updateUser,
            session_id: session_id,
            watchlist: watchlist,
            favorite: favorite,
            getListAddedMovies: this.getListAddedMovies,
            toggleModal: this.toggleModal
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
