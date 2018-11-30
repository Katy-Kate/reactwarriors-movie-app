import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import IconseHOC from "../HOC/IconsHOC";
library.add(faHeart, heartRegular);

class Favorite extends React.Component {
  render() {
    const { onClickIcon, icon } = this.props;

    return (
      <FontAwesomeIcon
        icon={icon ? faHeart : heartRegular}
        onClick={onClickIcon("favorite")}
      />
    );
  }
}
export default IconseHOC(Favorite);
