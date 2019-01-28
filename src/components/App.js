import React from "react";
import Header from "./Header/Header";
import Login from "./Login/Login";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";

export const AppContext = React.createContext();

@inject(({ loginFormStore, userStore }) => ({
  loginFormStore,
  userStore
}))
@observer
class App extends React.Component {
  componentDidMount = () => {
    this.props.userStore.getAuth();
  };

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
