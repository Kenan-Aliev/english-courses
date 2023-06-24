import React from "react";
import { Modal } from "@mui/material";

function ModalComponent({ isModalOpen, handleCloseModal, children }) {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {children}
    </Modal>
  );
}

export default ModalComponent;
