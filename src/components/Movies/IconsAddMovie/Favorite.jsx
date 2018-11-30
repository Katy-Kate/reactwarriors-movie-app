import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import IconseHOC from "../../HOC/IconsHOC";
library.add(faHeart, heartRegular);

class Favorite extends React.Component {
  render() {
    const { onClickIcon, icon } = this.props;

    return (
      <span className="heart-icon" onClick={onClickIcon("favorite")}>
        <FontAwesomeIcon icon={icon ? faHeart : heartRegular} />
      </span>
    );
  }
}
export default IconseHOC(Favorite);
