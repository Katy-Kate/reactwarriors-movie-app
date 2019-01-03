import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { action, observable } from "mobx";

const cookies = new Cookies();

class Store {
  @observable
  user = null;

  @observable
  loginValues = {
    username: "KateTuralnikova",
    password: "ekaterina00",
    repeatPassword: "ekaterina00"
  };

  @observable
  errors = {};

  @observable
  showLoginModal = false;

  @observable
  submitting = false;

  @observable
  session_id = null;

  validateFields = () => {
    const errors = {};
    if (this.loginValues.username.length <= 4) {
      errors.username = "Must be more then 4 charecters";
    }
    if (this.loginValues.password.length <= 5) {
      errors.password = "Must be more then 5 charecters";
    }
    if (this.loginValues.repeatPassword !== this.loginValues.password) {
      errors.repeatPassword = "Password must be the same";
    }
    return errors;
  };

  toggleModal = () => {
    this.showLoginModal = !this.showLoginModal;
  };

  onSubmit = () => {
    this.submitting = true;
    CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.loginValues.username,
            password: this.loginValues.password,
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        return CallApi.post("/authentication/session/new", {
          body: { request_token: data.request_token }
        });
      })
      .then(data => {
        this.updateSessionId(data.session_id);
        return CallApi.get("/account", {
          params: { session_id: data.session_id }
        });
      })
      .then(user => {
        this.submitting = false;
        this.updateUser(user);
        this.toggleModal();
      })
      .catch(error => {
        console.log("error", error);
        this.submitting = false;
        this.errors = {
          base: error.status_message
        };
      });
  };

  @action
  updateUser = user => {
    this.user = user;
  };
  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.session_id = session_id;
  };

  @action
  handleBlur = event => {
    const name = event.target.name;
    const errors = this.validateFields();
    console.log(errors.username);
    console.log(name);
    this.errors[name] = errors[name];
  };

  @action
  onChange = event => {
    console.log(event.target.name, event.target.value);
    this.loginValues[event.target.name] = event.target.value;
  };

  @action
  onLogin = event => {
    event.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.errors = errors;
    } else {
      this.onSubmit();
    }
  };

  @action
  logOut = () => {
    cookies.remove("session_id", { path: "/" });
    CallApi.delete("/authentication/session", {
      params: { session_id: this.session_id }
    }).then(() => {
      this.session_id = null;
      this.user = null;
      // this.watchlist = [];
      // this.favorite = [];
    });
  };
}

export default Store;
