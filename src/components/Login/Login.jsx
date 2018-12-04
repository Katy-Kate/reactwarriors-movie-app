import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  render() {
    const {
      toggleModal,
      showLoginModal,
      getFavoriteMovies,
      getWatchlistMovies
    } = this.props;
    return (
      <div>
        <Modal isOpen={showLoginModal} toggle={toggleModal}>
          <ModalBody>
            <LoginForm
              toggleModal={toggleModal}
              getFavoriteMovies={getFavoriteMovies}
              getWatchlistMovies={getWatchlistMovies}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
