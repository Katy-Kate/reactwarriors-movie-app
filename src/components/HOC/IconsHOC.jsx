import React from "react";
import CallApi from "../../api/api";

export default (Component, type) =>
  class IconsHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        isAdd: false
      };
    }

    findAddedIcon = () => {
      const isAddedIcon = this.props[type].some(object => {
        return object.id === this.props.item.id;
      });
      if (this.state.isAdd !== isAddedIcon) {
        this.setState({
          isAdd: isAddedIcon
        });
      }
    };

    onClickIcon = () => {
      if (this.props.session_id) {
        this.setState(
          {
            isAdd: !this.state.isAdd
          },
          () => {
            CallApi.post(`/account/${this.props.user.id}/${this.props.name}`, {
              params: { session_id: this.props.session_id },
              body: {
                media_type: "movie",
                media_id: this.props.item.id,
                [this.props.name]: this.state.isAdd
              }
            }).then(() => {
              this.props.getFavoriteMovies();
              this.props.getWatchlistMovies();
            });
          }
        );
      } else {
        this.props.toggleModal();
      }
    };

    componentDidUpdate = prevProps => {
      if (prevProps[type] !== this.props[type]) {
        this.findAddedIcon();
      }
    };
    render() {
      return (
        <Component
          {...this.props}
          onClickIcon={this.onClickIcon}
          isAdd={this.state.isAdd}
        />
      );
    }
  };
