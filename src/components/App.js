import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Login from "./Login/Login";
import CallApi from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "Все фильмы",
        with_genres: []
      },
      page: 1,
      total_pages: "",
      user: null,
      session_id: null,
      showLoginModal: false
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
    CallApi.delete("/authentication/session", {
      params: { session_id: this.state.session_id }
    }).then(() => {
      this.setState({
        session_id: null,
        user: null
      });
      cookies.remove("session_id");
    });
  };
  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages
    });
  };
  onClearFilters = () => {
    this.setState({
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "Все фильмы",
        with_genres: []
      },
      page: 1,
      total_pages: ""
    });
  };

  componentDidMount = () => {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", { params: { session_id: session_id } }).then(
        user => {
          this.updateUser(user);
          this.updateSessionId(session_id);
        }
      );
    }
  };
  render() {
    const {
      filters,
      page,
      total_pages,
      user,
      session_id,
      showLoginModal
    } = this.state;
    return (
      <AppContext.Provider
        value={{
          user: user,
          updateSessionId: this.updateSessionId,
          updateUser: this.updateUser,
          session_id: session_id
        }}
      >
        <div>
          <Header
            user={user}
            showLoginModal={showLoginModal}
            toggleModal={this.toggleModal}
            session_id={this.state.session_id}
            logOut={this.logOut}
          />
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body filters">
                    <h3>Фильтры:</h3>
                    <Filters
                      page={page}
                      total_pages={total_pages}
                      filters={filters}
                      onClearFilters={this.onClearFilters}
                      onChangeFilters={this.onChangeFilters}
                      onChangePagination={this.onChangePagination}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  filters={filters}
                  page={page}
                  onChangePagination={this.onChangePagination}
                  toggleModal={this.toggleModal}
                  user={user}
                  session_id={session_id}
                />
              </div>
            </div>
          </div>
        </div>
        <Login
          toggleModal={this.toggleModal}
          showLoginModal={this.state.showLoginModal}
        />
      </AppContext.Provider>
    );
  }
}
