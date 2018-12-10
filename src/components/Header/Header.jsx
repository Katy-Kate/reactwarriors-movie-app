import React from "react";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    const { user, toggleModal, session_id, logOut } = this.props;

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
          {user ? (
            <UserMenu session_id={session_id} logOut={logOut} />
          ) : (
            <button
              className="btn btn-success"
              type="button"
              onClick={toggleModal}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    );
  }
}
