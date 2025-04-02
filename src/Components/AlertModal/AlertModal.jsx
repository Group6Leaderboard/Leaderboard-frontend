import React, { useEffect } from "react";
import Swal from "sweetalert2";

const AlertModal = ({ show, onClose, title, message }) => {
  useEffect(() => {
    if (show) {
      Swal.fire({
        title: title,
        text: message,
        icon: "info", // Can be 'success', 'error', 'warning', 'info', or 'question'
        confirmButtonColor: "#5EB5AE",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-custom-popup",
        },
        showCloseButton: true,
      }).then(() => {
        onClose(); // Call onClose when the user closes the alert
      });
    }
  }, [show, title, message, onClose]);

  return null; // No need to return any JSX, SweetAlert2 handles the UI
};

export default AlertModal;
