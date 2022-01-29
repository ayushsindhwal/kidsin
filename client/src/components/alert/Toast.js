import React from "react";
import { toast } from "react-toastify";

const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const notifyError = (msg) => {
  toast.error(msg, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
const Toast = () => {
  return <div></div>;
};

export default Toast;
