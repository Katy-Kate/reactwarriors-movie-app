import React from "react";
import Favorite from "./Favorite";
import Bookmark from "./Bookmark";
import { fetchApi, API_KEY_3, API_URL } from "../../../api/api";

export default class IconsAddmovie extends React.Component {
  constructor() {
    super();
    this.state = {
      watchlist: false,
      favorite: false
    };
  }
  toogleMovieByName = name => {
    fetchApi(
      `${API_URL}/account/${
        this.props.user.id
      }/${name}?api_key=${API_KEY_3}&session_id=${this.props.session_id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: this.props.item.id,
          [name]: !this.state[name]
        })
      }
    ).then(response => {
      console.log(response);
    });
  };

  onClickIcon = name => () => {
    if (this.props.session_id) {
      this.setState(
        {
          [name]: !this.state[name]
        },
        this.toogleMovieByName(name)
      );
    }
  };

  render() {
    const { watchlist, favorite } = this.state;
    return (
      <div>
        <Favorite onClickIcon={this.onClickIcon} icon={favorite} />
        <Bookmark onClickIcon={this.onClickIcon} icon={watchlist} />
      </div>
    );
  }
}
