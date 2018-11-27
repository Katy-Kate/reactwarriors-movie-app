import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";

library.add(faHeart, heartRegular);

export default class Favorite extends React.Component {
  render() {
    const { onClickIcon, icon } = this.props;

    return (
      <span className="heart-icon" onClick={onClickIcon("heart")}>
        <FontAwesomeIcon icon={icon ? faHeart : heartRegular} />
      </span>
    );
  }
}
