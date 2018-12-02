import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class IconseHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        icon: false
      };
    }
    onClickIcon = iconName => () => {
      if (this.props.session_id) {
        this.setState(
          {
            icon: !this.state.icon
          },
          this.toogleMovieByName(iconName)
        );
      }
    };
    toogleMovieByName = iconName => {
      CallApi.post(`/account/${this.props.user.id}/${iconName}`, {
        params: { session_id: this.props.session_id },
        body: {
          media_type: "movie",
          media_id: this.props.item.id,
          [iconName]: !this.state.icon
        }
      });
    };
    render() {
      return (
        <Component onClickIcon={this.onClickIcon} icon={this.state.icon} />
      );
    }
  };
