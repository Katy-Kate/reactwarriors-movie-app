import React from "react";
import Header from "./Header/Header";
import Login from "./Login/Login";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import { BrowserRouter, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";

export const AppContext = React.createContext();

@inject(({ formStore, userStore }) => ({
  formStore: formStore,
  userStore: userStore
}))
@observer
class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     watchlist: [],
  //     favorite: []
  //   };
  // }

  componentDidMount = () => {
    this.props.userStore.getAuth();
  };

  // getListAddedMovies = type => {
  //   if (this.props.user && this.props.session_id) {
  //     CallApi.get(`/account/${this.props.userStore.user.id}/${type}/movies`, {
  //       params: { session_id: this.props.userStore.session_id }
  //     }).then(data => {
  //       this.setState({
  //         [type]: [...data.results]
  //       });
  //     });
  //   } else {
  //     console.log("we don't have user");
  //   }
  // };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          <Login />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default App;
