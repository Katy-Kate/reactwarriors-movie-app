import React from "react";
import Field from "./Field";
import { API_URL, API_KEY_3, fetchApi } from "../../../api/api";

export default class LoginForm extends React.Component {
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

  handleBlur = () => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  };

  validateFields = input => {
    const errors = {};
    if (this.state.username === "") {
      errors.username = "Not empty";
    }
    if (this.state.password === "") {
      errors.password = "Not empty";
    }
    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = "Password must be the same";
    }

    return errors;
  };
  onSubmit = () => {
    this.setState({
      submitting: true
    });
    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              request_token: data.request_token
            })
          }
        );
      })

      .then(data => {
        this.props.updateSessionId(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${
            data.session_id
          }`
        );
      })
      .then(user => {
        this.setState(
          {
            submitting: false
          },
          () => {
            this.props.updateUser(user);
          }
        );

        console.log("session", user);
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
