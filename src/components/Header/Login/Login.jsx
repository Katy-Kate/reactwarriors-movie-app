import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  render() {
    const { updateSessionId, updateUser, toggleModal, showModal } = this.props;
    return (
      <div>
        <button className="btn btn-success" type="button" onClick={toggleModal}>
          Login
        </button>
        <Modal isOpen={showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm
              updateUser={updateUser}
              updateSessionId={updateSessionId}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
