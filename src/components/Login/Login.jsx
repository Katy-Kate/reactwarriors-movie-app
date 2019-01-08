import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { observer, inject } from "mobx-react";

@inject(({ loginFormStore }) => ({
  loginFormStore
}))
@observer
class Login extends React.Component {
  render() {
    const {
      loginFormStore: { toggleModal, showLoginModal }
    } = this.props;
    return (
      <div>
        <Modal isOpen={showLoginModal} toggle={toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Login;
