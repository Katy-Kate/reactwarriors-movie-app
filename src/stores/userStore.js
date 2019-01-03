import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { action, observable, configure, computed } from "mobx";

configure({ enforceActions: "always" });
const cookies = new Cookies();

class Store {
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

  @action
  updateAuth = ({ user, session_id }) => {
    this.user = user;
    this.session_id = session_id;
  };

  @action
  logOut = () => {
    cookies.remove("session_id", { path: "/" });
    CallApi.delete("/authentication/session", {
      params: { session_id: this.session_id }
    }).then(() => {
      this.updateAuth({
        user: {},
        session_id: {}
      });
      // this.watchlist = [];
      // this.favorite = [];
    });
  };
}
export const userStore = new Store();
