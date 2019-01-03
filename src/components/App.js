import React from "react";
import Header from "./Header/Header";
import Login from "./Login/Login";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { BrowserRouter, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";

export const AppContext = React.createContext();
const cookies = new Cookies();

@inject(({ formStore, userStore }) => ({
  formStore: formStore,
  userStore: userStore
}))
@observer
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      watchlist: [],
      favorite: []
    };
  }

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

  componentDidMount = () => {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: { session_id: session_id }
      }).then(user => {
        this.props.userStore.updateAuth({ user });

        this.getListAddedMovies("favorite");
        this.getListAddedMovies("watchlist");
      });
    }
  };

  getListAddedMovies = type => {
    if (this.props.user && this.props.session_id) {
      CallApi.get(`/account/${this.props.userStore.user.id}/${type}/movies`, {
        params: { session_id: this.props.userStore.session_id }
      }).then(data => {
        this.setState({
          [type]: [...data.results]
        });
      });
    } else {
      console.log("we don't have user");
    }
  };

  render() {
    const { watchlist, favorite } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            watchlist: watchlist,
            favorite: favorite,
            getListAddedMovies: this.getListAddedMovies
          }}
        >
          <Header />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          <Login />
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
export default App;
