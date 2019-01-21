import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { action, observable, configure, computed } from "mobx";

configure({ enforceActions: "always" });
const cookies = new Cookies();

class UserStore {
  @observable
  user = {};

  @observable
  showLoginModal = false;

  @observable
  errors = {};

  @observable
  session_id = null;

  @computed
  get isAuth() {
    return Boolean(Object.keys(this.user).length);
  }

  getAuth() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: { session_id: session_id }
      }).then(user => {
        this.updateAuth({ user });
        // this.getListAddedMovies("favorite");
        // this.getListAddedMovies("watchlist");
      });
    }
  }

  @action
  updateAuth = ({ user, session_id }) => {
    this.user = user;
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.session_id = session_id;
  };

  @action
  clearAuth = () => {
    this.user = {};
    this.session_id = null;
  };

  logOut = () => {
    cookies.remove("session_id", { path: "/" });
    CallApi.delete("/authentication/session", {
      params: { session_id: this.session_id }
    }).then(() => {
      this.clearAuth();
      // this.watchlist = [];
      // this.favorite = [];
    });
  };
}
export const userStore = new UserStore();
