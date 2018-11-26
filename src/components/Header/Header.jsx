import React from "react";
// import PropTypes from "prop-types";
import Login from "./Login/Login";
import User from "./User";

export default class Header extends React.Component {
  // static propTypes = {
  //   user: PropTypes.object.isRequired,
  //   updateUser: PropTypes.func.isRequired
  // };
  render() {
    const { user, updateUser, updateSessionId } = this.props;

    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link">Home</a>
            </li>
          </ul>
          {user !== null ? (
            <User user={user} />
          ) : (
            <Login updateUser={updateUser} updateSessionId={updateSessionId} />
          )}
        </div>
      </nav>
    );
  }
}
