import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";

library.add(faBookmark, bookmarkRegular);

export default class Watchlist extends React.Component {
  render() {
    const { onClickIcon, icon } = this.props;
    return (
      <span className="bookmark-icon" onClick={onClickIcon("watchlist")}>
        <FontAwesomeIcon icon={icon ? faBookmark : bookmarkRegular} />
      </span>
    );
  }
}
