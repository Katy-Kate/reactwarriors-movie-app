import React from "react";
import Field from "./Field";

import { inject, observer } from "mobx-react";

@inject(({ store }) => ({
  username: store.loginValues.username,
  password: store.loginValues.password,
  repeatPassword: store.loginValues.repeatPassword,
  submitting: store.loginValues.submitting,
  onLogin: store.onLogin,
  errors: store.errors
}))
@observer
class LoginForm extends React.Component {
  render() {
    const {
      username,
      password,
      repeatPassword,
      errors,
      submitting,
      onLogin
    } = this.props;
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
            errors={errors.username}
          />
          <Field
            id="password"
            labelText="Password"
            type="password"
            placeholderText="Enter password"
            name="password"
            value={password}
            errors={errors.password}
          />
          <Field
            id="repeatPassword"
            labelText="Repeat password"
            type="password"
            placeholderText="Enter repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            errors={errors.repeatPassword}
          />
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={onLogin}
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
export default LoginForm;
