import React from "react";
import Login from "./Login/Login";
import UserMenu from "./UserMenu";

export default class Header extends React.Component {
  render() {
    const { user, showModal, toggleModal, session_id, logOut } = this.props;

    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <span className="nav-link">Home</span>
            </li>
          </ul>
          {user ? (
            <UserMenu session_id={session_id} logOut={logOut} />
          ) : (
            <Login showModal={showModal} toggleModal={toggleModal} />
          )}
        </div>
      </nav>
    );
  }
}
