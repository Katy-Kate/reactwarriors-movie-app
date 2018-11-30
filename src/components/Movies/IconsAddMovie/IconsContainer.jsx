import React from "react";
import Favorite from "./Favorite";
import Watchlist from "./Watchlist";

export default class IconsContainer extends React.Component {
  render() {
    return (
      <div>
        <Watchlist {...this.props} />
        <Favorite {...this.props} />
      </div>
    );
  }
}
