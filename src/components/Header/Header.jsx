import React from "react";
import Login from "./Login/Login";
import User from "./User";

export default class Header extends React.Component {
  render() {
    const { user, showModal, toggleModal } = this.props;

    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <span className="nav-link">Home</span>
            </li>
          </ul>
          {user ? (
            <User />
          ) : (
            <Login showModal={showModal} toggleModal={toggleModal} />
          )}
        </div>
      </nav>
    );
  }
}
