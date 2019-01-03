import React from "react";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject(({ formStore, userStore }) => ({
  userStore,
  formStore
}))
@observer
class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-secondary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {this.props.userStore.isAuth ? (
            <UserMenu />
          ) : (
            <button
              className="btn btn-success"
              type="button"
              onClick={this.props.formStore.toggleModal}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    );
  }
}
export default Header;
