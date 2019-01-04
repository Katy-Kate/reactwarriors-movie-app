import React from "react";
import Field from "./Field";

import { inject, observer } from "mobx-react";

@inject(({ formStore }) => ({
  formStore
}))
@observer
class LoginForm extends React.Component {
  render() {
    const { loginValues, errors, submitting, onLogin } = this.props.formStore;

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
            value={loginValues.username}
            errors={errors.username}
          />
          <Field
            id="password"
            labelText="Password"
            type="password"
            placeholderText="Enter password"
            name="password"
            value={loginValues.password}
            errors={errors.password}
          />
          <Field
            id="repeatPassword"
            labelText="Repeat password"
            type="password"
            placeholderText="Enter repeatPassword"
            name="repeatPassword"
            value={loginValues.repeatPassword}
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
