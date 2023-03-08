import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import Global from "../../context/Global";
const InstructionModal = () => {
  const contextData = useContext(Global);
  return (
    <Modal
      size="lg"
      className="professionalDisclamerModal "
      centered
      show={contextData?.showDisclamer}
      onHide={() => contextData?.setShowDisclamer(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>How to Navigate</Modal.Title>
      </Modal.Header>
      <Modal.Body className="theme-bg-color">
        <ol>
          <li>
            Go to the &nbsp;
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                contextData?.setCurrentTab("Portfolio");
                contextData?.setShowDisclamer(false);
              }}
            >
              Portfolio
            </span>
            &nbsp; menu from Left menu bar.
          </li>
          <li> Select the Catagory which you want to sell designs.</li>
          <li> Select the Sub-Catagory.</li>
          <li>
            The Design which you already selected and uploaded are displayed
            here. Click on Add Button displayed After Images
          </li>
          <li>
            Then enter the price of the product and upload the related image of
            it.
          </li>
        </ol>
      </Modal.Body>
    </Modal>
  );
};

export default InstructionModal;
