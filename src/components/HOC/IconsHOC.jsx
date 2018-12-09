import React from "react";
import CallApi from "../../api/api";

export default (Component, type) =>
  class IconsHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAdd: this.props[type].includes(this.props.item.id)
      };
    }

    findAddedIcon = () => {
      console.log("dddddddddddd", this.props[type]);
      const isAddedIcon = this.props[type].some(object => {
        return object.id === this.props.item.id;
      });

      // const isAddedIcon = this.props[type].includes(this.props.item.id);
      if (this.state.isAdd !== isAddedIcon) {
        this.setState({
          isAdd: isAddedIcon
        });
      }
    };

    onClickIcon = () => {
      if (this.props.user) {
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
              this.props.getListAddedMovies(this.props.name);
            });
          }
        );
      } else {
        this.props.toggleModal();
      }
    };

    componentDidMount = () => {
      this.findAddedIcon();
    };

    componentDidUpdate = prevProps => {
      console.log(
        "prevProps[type]",
        prevProps[type],
        "this.props[type]",
        this.props[type]
      );
      if (
        prevProps[type].includes(this.props.item.id) !==
        this.props[type].includes(this.props.item.id)
      ) {
        this.findAddedIcon();
      }
    };
    render() {
      console.log("this.state.isAdd", this.state.isAdd);
      return (
        <Component
          {...this.props}
          onClickIcon={this.onClickIcon}
          isAdd={this.state.isAdd}
        />
      );
    }
  };
