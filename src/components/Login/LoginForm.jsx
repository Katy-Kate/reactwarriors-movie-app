import React from "react";
import Field from "./Field";
import CallApi from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    errors: {},
    submitting: false
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      }
    }));
  };

  handleBlur = input => {
    console.log("input", input.target.id);
    const inputName = input.target.id;

    if (this.state[inputName] === "") {
      this.setState({ errors: { [inputName]: "Not empty" } });
      return false;
    } else {
      if (inputName === "username" && this.state[inputName].length <= 4) {
        this.setState({
          errors: { username: "Must be more then 4 charecters" }
        });
        return false;
      } else if (
        inputName === "password" &&
        this.state[inputName].length <= 4
      ) {
        this.setState({
          errors: { password: "Must be more then 4 charecters" }
        });
        return false;
      } else if (
        inputName === "repeatPassword" &&
        this.state.repeatPassword !== this.state.password
      ) {
        this.setState({
          errors: { repeatPassword: "Password must be the same" }
        });
        return false;
      }
    }
  };

  validateFields = () => {
    const errors = {};
    if (this.state.username <= 4) {
      errors.username = "Must be more then 4 charecters";
    }
    if (this.state.password <= 5) {
      errors.password = "Must be more then 5 charecters";
    }
    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = "Password must be the same";
    }

    return errors;
  };
  onSubmit = () => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }

    this.setState({
      submitting: true
    });
    CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.state.username,
            password: this.state.password,
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
        this.props.updateSessionId(data.session_id);
        return CallApi.get("/account", {
          params: { session_id: data.session_id }
        });
      })
      .then(user => {
        this.setState(
          {
            submitting: false
          },
          () => {
            this.props.updateUser(user);
            this.props.toggleModal();
          }
        );

        console.log("user", user);
      })
      .catch(error => {
        console.log("error", error);
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message
          }
        });
      });
  };
  onLogin = e => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {
      console.log("Submit");
      this.onSubmit();
    }
  };

  render() {
    const {
      username,
      password,
      repeatPassword,
      errors,
      submitting
    } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <Field
            id="username"
            labelText="Username"
            type="text"
            placeholderText="Enter username"
            name="username"
            value={username}
            onChange={this.onChange}
            errors={errors.username}
            onBlur={this.handleBlur}
          />
          <Field
            id="password"
            labelText="Password"
            type="password"
            placeholderText="Enter password"
            name="password"
            value={password}
            onChange={this.onChange}
            errors={errors.password}
            onBlur={this.handleBlur}
          />
          <Field
            id="repeatPassword"
            labelText="Repeat password"
            type="password"
            placeholderText="Enter repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            onChange={this.onChange}
            errors={errors.repeatPassword}
            onBlur={this.handleBlur}
          />
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}
export default AppContextHOC(LoginForm);
