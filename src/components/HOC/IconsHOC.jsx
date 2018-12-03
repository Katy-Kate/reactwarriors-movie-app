import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class IconsHOC extends React.Component {
    constructor() {
      super();
      this.state = {
        isAdd: false
      };
    }
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
            });
          }
        );
      } else {
        this.props.toggleModal();
      }
    };
    changeIconState = state => {
      this.setState({
        isAdd: state
      });
      console.log("this.props.isAddedIcon", this.props.isAddedIcon);
    };

    componentDidUpdate = prevProps => {
      if (this.props.isAddedIcon !== prevProps.isAddedIcon) {
        this.setState({
          isAdd: this.props.isAddedIcon
        });
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
