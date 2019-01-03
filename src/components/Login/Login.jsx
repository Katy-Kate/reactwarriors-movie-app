import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { observer, inject } from "mobx-react";

@inject(({ formStore }) => ({
  toggleModal: formStore.toggleModal,
  showLoginModal: formStore.showLoginModal
}))
@observer
class Login extends React.Component {
  render() {
    const { toggleModal, showLoginModal } = this.props;
    return (
      <div>
        <Modal isOpen={showLoginModal} toggle={toggleModal}>
          <ModalBody>
            <LoginForm toggleModal={toggleModal} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Login;
