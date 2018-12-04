import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import AppContextHOC from "../HOC/AppContextHOC";
import IconsHOC from "../HOC/IconsHOC";
library.add(faHeart, heartRegular);

class Favorite extends React.Component {
  render() {
    const { onClickIcon, isAdd } = this.props;

    return (
      <FontAwesomeIcon
        icon={isAdd ? faHeart : heartRegular}
        onClick={onClickIcon}
      />
    );
  }
}
export default AppContextHOC(IconsHOC(Favorite, "favoriteMovies"));
