import React from "react";
import { AppContext } from "../App";

class User extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <img
          width="40px"
          className="rounded-circle"
          alt="avatar"
          src={`https://secure.gravatar.com/avatar/${
            user.avatar.gravatar.hash
          }.jpg?s=64"`}
        />
      </div>
    );
  }
}

const UserContainer = props => {
  return (
    <AppContext.Consumer>
      {context => {
        return (
          <User
            user={context.user}
            updateSessionId={context.updateSessionId}
            {...props}
          />
        );
      }}
    </AppContext.Consumer>
  );
};
UserContainer.displayName = "UserContainer";
export default UserContainer;
