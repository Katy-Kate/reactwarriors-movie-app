import React from "react";
import { fetchApi, API_KEY_3, API_URL } from "../../api/api";

export default Component =>
  class IconseHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        icon: false
      };
    }
    onClickIcon = iconName => () => {
      console.log("this.state.icon", this.state.icon);
      console.log("iconName", iconName);
      if (this.props.session_id) {
        this.setState(
          {
            icon: !this.state.icon
          },
          this.toogleMovieByName(iconName)
        );
      }
      console.log("this.state.icon", this.state.icon);
    };
    toogleMovieByName = iconName => {
      fetchApi(
        `${API_URL}/account/${
          this.props.user.id
        }/${iconName}?api_key=${API_KEY_3}&session_id=${this.props.session_id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json;charset=utf-8"
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: this.props.item.id,
            [iconName]: !this.state.icon
          })
        }
      ).then(response => {
        console.log(response);
      });
    };

    render() {
      return (
        <div className="d-flex justify-content-right">
          <Component onClickIcon={this.onClickIcon} icon={this.state.icon} />
        </div>
      );
    }
  };
