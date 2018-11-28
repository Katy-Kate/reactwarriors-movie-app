import React from "react";
import Favorite from "./Favorite";
import Bookmark from "./Bookmark";
import { fetchApi, API_KEY_3, API_URL } from "../../../api/api";
import { AppContext } from "../../App";

class IconsAddmovie extends React.Component {
  constructor() {
    super();
    this.state = {
      bookmark: false,
      heart: false
    };
  }
  onChangeFavoritList = () => {
    fetchApi(
      `${API_URL}/account/${
        this.props.user.id
      }/favorite?api_key=${API_KEY_3}&session_id=${this.props.session_id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: this.props.item.id,
          favorite: !this.state.heart
        })
      }
    ).then(response => {
      console.log(response);
    });
  };
  onChangeWatchList = () => {
    fetchApi(
      `${API_URL}/account/${
        this.props.user.id
      }/watchlist?api_key=${API_KEY_3}&session_id=${this.props.session_id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: this.props.item.id,
          watchlist: !this.state.bookmark
        })
      }
    ).then(response => {
      console.log(response);
    });
  };
  onClickIcon = name => () => {
    if (this.onCheckLoginUser()) {
      console.log(name);
      this.setState({
        [name]: !this.state[name]
      });
      if (name === "heart") {
        this.onChangeFavoritList();
      } else if (name === "bookmark") {
        this.onChangeWatchList();
      }
    } else {
      this.props.toggleModal();
    }
  };
  onCheckLoginUser = () => {
    const session_id = this.props.session_id;
    if (session_id !== null) {
      console.log("checkLoginUser true");
      return true;
    } else {
      console.log("onCheckLoginUser false");
      return false;
    }
  };
  render() {
    const { bookmark, heart } = this.state;
    return (
      <div>
        <Favorite onClickIcon={this.onClickIcon} icon={heart} />
        <Bookmark onClickIcon={this.onClickIcon} icon={bookmark} />
      </div>
    );
  }
}

export default props => {
  return (
    <AppContext.Consumer>
      {context => (
        <IconsAddmovie
          user={context.user}
          session_id={context.session_id}
          {...props}
        />
      )}
    </AppContext.Consumer>
  );
};
