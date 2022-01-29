import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { checkImage } from "../utils/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { userProfileUpdate } from "../redux/actions/profile";
import { Link } from "react-router-dom";
import Userlist from "./Userlist";
const SidebarStudent = () => {
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState([]);
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [dash, setDash] = useState("none");
  const [int, setInt] = useState("none");
  const [course, setCourse] = useState("none");
  const [event, setEvent] = useState("none");
  const [info, setInfo] = useState("none");
  const [conn, setConn] = useState("none");

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
            onClick={() => {
              setInfo("none");
              setDash("active");
              setInt("none");
              setConn("none");
              setCourse("none");
              setEvent("none");
            }}
            to="/dashboard"
            className={`list-group-item list-group-item-action cust-bg ${dash}`}
          >
            <i className="fa fa-user" aria-hidden="true"></i>{" "} Profile
          </Link>
          <Link
            to="/interest"
            onClick={() => {
              setInfo("none");
              setDash("none");
              setInt("active");
              setCourse("none");
              setEvent("none");
              setConn("none");
            }}
            className={`list-group-item list-group-item-action cust-bg ${int}`}
          >
            <i className="fa fa-podcast" aria-hidden="true"></i>{" "} 
            Interest
          </Link>
          <Link
            to="/courses"
            onClick={() => {
              setInfo("none");
              setDash("none");
              setInt("none");
              setCourse("active");
              setEvent("none");
              setConn("none");
            }}
            className={`list-group-item list-group-item-action cust-bg ${course}`}
          >
            <i className="fa fa-book" aria-hidden="true"></i>{" "} 
            Courses
          </Link>
          <Link
            to="/upcomingevent"
            onClick={() => {
              setInfo("none");
              setDash("none");
              setInt("none");
              setCourse("none");
              setEvent("active");
              setConn("none");
            }}
            className={`list-group-item list-group-item-action cust-bg ${event}`}
          >
<i className="fas fa-calendar-alt"></i>     {" "}        Events
          </Link>

          <Link
            to="/connections"
            onClick={() => {
              setInfo("none");
              setDash("none");
              setInt("none");
              setCourse("none");
              setEvent("none");
              setConn("active");
            }}
            className={`list-group-item list-group-item-action cust-bg ${conn}`}
          >
            <i className="fa fa-users" aria-hidden="true"></i>{" "}  Connections
          </Link>
          <Link
            to="/info"
            onClick={() => {
              setInfo("active");
              setDash("none");
              setInt("none");
              setCourse("none");
              setEvent("none");
              setConn("none");
            }}
            className={`list-group-item list-group-item-action cust-bg ${info}`}
          >
            <i className="fas fa-user-edit"></i>{" "} Personal Info
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
      <Userlist />

    </>
  );
};

export default SidebarStudent;
