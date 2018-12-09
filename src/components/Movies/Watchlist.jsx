import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import AppContextHOC from "../HOC/AppContextHOC";
import IconseHOC from "../HOC/IconsHOC";
library.add(faBookmark, bookmarkRegular);

class Watchlist extends React.Component {
  render() {
    const { onClickIcon, isAdd } = this.props;
    return (
      <FontAwesomeIcon
        icon={isAdd ? faBookmark : bookmarkRegular}
        onClick={onClickIcon}
      />
    );
  }
}
export default AppContextHOC(IconseHOC(Watchlist, "watchlist"));
