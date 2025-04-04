import React from "react";
import Swal from "sweetalert2";

const AlertModal = {
  success: (title = "Success", message = "Operation completed successfully!") => {
    Swal.fire({
      title: title,
      text: message,
      icon: "success",
      confirmButtonColor: "#5EB5AE",
      confirmButtonText: "OK",
    });
  },

  error: (title = "Error", message = "Something went wrong!") => {
    Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "OK",
    });
  },

  confirmDelete: (callback) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
        Alert.success("Deleted!", "The item has been deleted.");
      }
    });
  },

  loginSuccess: () => {
    Swal.fire({
      title: "Login Successful!",
      text: "Welcome back!",
      icon: "success",
      confirmButtonColor: "#5EB5AE",
      confirmButtonText: "OK",
    });
  },
};

export default AlertModal;
