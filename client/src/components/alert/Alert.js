import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "./Loading";

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
const Notify = () => {
  const { alert } = useSelector((state) => state);
  useEffect(() => {
    alert.success ? notifySuccess(alert.success) : notifyError(alert.error);

    return () => {};
  }, [alert.success, alert.error]);
  return <div>{alert.loading && <Loading />}</div>;
};

export default Notify;
