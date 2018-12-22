import React from "react";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject(({ store }) => ({
  user: store.user,
  toggleModal: store.toggleModal
}))
@observer
class Header extends React.Component {
  render() {
    const { user, toggleModal } = this.props;

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
            <UserMenu />
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
export default Header;
