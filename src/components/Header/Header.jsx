import React from "react";
import UserMenu from "./UserMenu";

export default class Header extends React.Component {
  render() {
    const { user, toggleModal, session_id, logOut } = this.props;

    return (
      <nav className="navbar navbar-dark bg-secondary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <span className="nav-link">Home</span>
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
