import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { action, observable, configure } from "mobx";
import { userStore } from "./userStore";
configure({ enforceActions: "always" });

const cookies = new Cookies();

class Store {
  @observable
  loginValues = {
    username: "KateTuralnikova",
    password: "ekaterina00",
    repeatPassword: "ekaterina00"
  };

  @observable
  errors = {
    base: null
  };

  @observable
  baseError = null;

  @observable
  submitting = false;

  @observable
  showLoginModal = false;

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
      this.updateErrors(errors);
      //this.errors = errors;
    } else {
      this.onChangeBaseError();
      this.onSubmit();
    }
  };

  @action
  updateErrors = (errors = {}) => {
    for (let key in errors) {
      this.errors[key] = errors[key];
    }
  };

  @action
  onChangeBaseError = (error: {}) => {
    this.errors.base = error;
  };
  @action
  toggleModal = () => {
    this.showLoginModal = !this.showLoginModal;
  };

  @action
  onChangeSubmiting = value => {
    this.submitting = value;
  };

  onSubmit = () => {
    this.onChangeSubmiting(true);
    let session_id = null;
    let baseError = null;
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
        session_id = data.session_id;
        return CallApi.get("/account", {
          params: { session_id: data.session_id }
        });
      })
      .then(user => {
        this.onChangeSubmiting(false);
        userStore.updateAuth({ session_id, user });
        this.toggleModal();
      })
      .catch(error => {
        console.log("error", error);
        this.onChangeSubmiting(false);
        baseError = error.status_message;
        this.onChangeBaseError(baseError);
        // this.onChangeBaseError(error.status_message);
      });
  };
}
export const formStore = new Store();
