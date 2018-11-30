import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  render() {
    const { toggleModal, showLoginModal } = this.props;
    return (
      <div>
        {/* <button className="btn btn-success" type="button" onClick={toggleModal}>
          Login
        </button> */}
        <Modal isOpen={showLoginModal} toggle={toggleModal}>
          <ModalBody>
            <LoginForm toggleModal={toggleModal} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
