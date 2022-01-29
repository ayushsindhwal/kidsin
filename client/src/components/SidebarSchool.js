import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { checkImage } from "../utils/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { userProfileUpdate } from "../redux/actions/profile";
import { Link } from "react-router-dom";
import Userlist from "./Userlist";
const SidebarSchool = () => {
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fileHandler = (e) => {
    const file = e.currentTarget.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setAvatar(file);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      profile_pic: "",
    },
    onSubmit: (values) => {
      dispatch(userProfileUpdate({ avatar, auth }));
      handleClose();
    },
  });

  return (
    <>
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">
          <div className="logo">
          <img
                  src="/images/logo.png"
                  className=" mb-2"
                  style={{width:'50px',height:'50px'}}

                  alt=""
                />          </div>
        </div>
        <div className="sidebar-heading">
          <img
            src={auth.user != undefined ? auth.user.avatar : null}
            onClick={ ()=>dispatch({
              type: GLOBALTYPES.USERLIST,
              payload: { show: true, userdata:auth.user.avatar,image: true },
            })} 
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            className="img-fluid"
            alt=""
          />
          <i className="fa fa-edit" onClick={() => handleShow()}></i>

          <h3>{auth.user !== undefined ?(auth.user.verified?<><img src="images/verified.png" alt="" srcset="" />{auth.user.fullname}</>:auth.user.fullname): null}</h3>
        </div>
        <div className="list-group list-group-flush">
          <Link
            to="/schooldashboard"
            className="list-group-item list-group-item-action cust-bg active"
          >
            <i className="fa fa-user" aria-hidden="true"></i> Profile
          </Link>
          <Link
            to="/events"
            className="list-group-item list-group-item-action cust-bg"
          >
<i className="fas fa-calendar-alt"></i>            Upcoming Events
          </Link>
          <Link
            to="/createcourses"
            className="list-group-item list-group-item-action cust-bg"
          >
            <i className="fa fa-book" aria-hidden="true"></i>
            Courses
          </Link>
          <Link
            to="/followers"
            className="list-group-item list-group-item-action cust-bg"
          >
            <i className="fa fa-users" aria-hidden="true"></i> followers
          </Link>
          <Link
            to="/home"
            className="list-group-item list-group-item-action cust-bg"
          >
            <i className="fas fa-photo-video"></i> Posts
          </Link>
          <Link
            to="/packages"
            className="list-group-item list-group-item-action cust-bg"
          >
            <i className="fas fa-money-bill-wave"></i>Packages
          </Link>

          <Link
            to="/createads"
            className="list-group-item list-group-item-action cust-bg"
          >
            <i className="fas fa-ad"></i>Create Ads
          </Link>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-signup" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="file"
                id="user-image"
                name="profile_pic"
                className="form-control"
                onChange={(e) => fileHandler(e)}
                placeholder={avatar[0]!==undefined?avatar[0].name:'null'}
              />
              {formik.errors.profile_pic ? (
                <small className="text-danger">
                  {formik.errors.profile_pic}
                </small>
              ) : null}
            </div>

            <button className="btn btn-success btn-block" type="submit">
              Save changes
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Userlist/>
    </>
  );
};

export default SidebarSchool;
