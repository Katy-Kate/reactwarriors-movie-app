import React from "react";
import { AppContext } from "../App";
import { fetchApi, API_KEY_3, API_URL } from "../../api/api";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class UserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onClickLogOut = () => {
    fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        session_id: this.props.session_id
      })
    }).then(() => {
      this.props.logOut();
    });
  };
  render() {
    const { user, logOut } = this.props;
    return (
      <UncontrolledDropdown nav inNavbar className="user-menu">
        <DropdownToggle nav caret>
          <img
            width="40px"
            className="rounded-circle"
            alt="avatar"
            src={`https://secure.gravatar.com/avatar/${
              user.avatar.gravatar.hash
            }.jpg?s=64"`}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.onClickLogOut}>Выход</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

const UserContainer = props => {
  return (
    <AppContext.Consumer>
      {context => {
        return (
          <div>
            <UserMenu
              user={context.user}
              updateSessionId={context.updateSessionId}
              {...props}
            />
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};
UserContainer.displayName = "UserContainer";
export default UserContainer;
