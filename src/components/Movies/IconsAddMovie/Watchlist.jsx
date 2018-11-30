import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import IconseHOC from "../../HOC/IconsHOC";
library.add(faBookmark, bookmarkRegular);

class Watchlist extends React.Component {
  render() {
    const { onClickIcon, icon } = this.props;

    return (
      <span className="bookmark-icon" onClick={onClickIcon("watchlist")}>
        <FontAwesomeIcon icon={icon ? faBookmark : bookmarkRegular} />
      </span>
    );
  }
}
export default IconseHOC(Watchlist);
