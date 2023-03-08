import React from "react";
import Loader from "../Loader";
import { Modal } from "react-bootstrap";
const LoadingModal = ({ loader }) => {
  return (
    <div>
      <Modal
        show={loader}
        fullscreen={true}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modalProfessionalDashboard"
      >
        <Loader />
      </Modal>
    </div>
  );
};

export default LoadingModal;
