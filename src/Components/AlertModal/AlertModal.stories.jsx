

import React from "react";
import AlertModal from "./AlertModal";

export default {
  title: "Components/AlertModal",
  component: AlertModal,
};

export const SuccessAlertModal = () => (
  <button onClick={() => AlertModal.success("Success", "Data saved successfully!")}>Show Success AlertModal</button>
);

export const ErrorAlertModal = () => (
  <button onClick={() => AlertModal.error("Error", "Failed to save data!")}>Show Error AlertModal</button>
);

export const ConfirmDeleteAlertModal = () => (
  <button onClick={() => AlertModal.confirmDelete(() => console.log("Item Deleted"))}>
    Show Delete Confirmation
  </button>
);

export const LoginSuccessAlertModal = () => (
  <button onClick={AlertModal.loginSuccess}>Show Login Success</button>
);
