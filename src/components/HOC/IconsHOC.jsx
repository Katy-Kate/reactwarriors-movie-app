import React from "react";
import CallApi from "../../api/api";
import _ from "lodash";
import { inject, observer } from "mobx-react";

export default (Component, type) =>
  @inject(({ moviesPageStore, userStore, loginFormStore }) => ({
    moviesPageStore,
    userStore,
    loginFormStore
  }))
  @observer
  class IconsHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAdd: this.getAddById({ list: props[type], id: props.item.id })
      };
    }
    getAddById = ({ list, id }) => list.some(item => item.id === id);

    onClickIcon = () => {
      if (this.props.userStore.isAuth) {
        this.setState(
          {
            isAdd: !this.state.isAdd
          },
          () => {
            CallApi.post(
              `/account/${this.props.userStore.user.id}/${this.props.name}`,
              {
                params: { session_id: this.props.userStore.session_id },
                body: {
                  media_type: "movie",
                  media_id: this.props.item.id,
                  [this.props.name]: this.state.isAdd
                }
              }
            ).then(() => {
              this.props.getListAddedMovies([this.props.name]);
            });
          }
        );
      } else {
        this.props.loginFormStore.toggleModal();
      }
    };

    componentDidUpdate(prevProps, prevState) {
      if (
        !_.isEqual(prevProps[type], this.props[type]) &&
        this.state.isAdd !==
          this.getAddById({ list: this.props[type], id: this.props.item.id })
      ) {
        this.setState({
          isAdd: this.getAddById({
            list: this.props[type],
            id: this.props.item.id
          })
        });
      }
    }

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
