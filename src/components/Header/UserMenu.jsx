import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { observer, inject } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <UncontrolledDropdown nav inNavbar className="user-menu">
        <DropdownToggle nav caret>
          <img
            width="40px"
            className="rounded-circle"
            alt="avatar"
            src={`https://secure.gravatar.com/avatar/${
              this.props.userStore.user.avatar.gravatar.hash
            }.jpg?s=64"`}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.props.userStore.logOut}>
            Выход
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

export default AppContextHOC(UserMenu);
