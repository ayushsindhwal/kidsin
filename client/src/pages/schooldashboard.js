import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { updateUserMain } from "../redux/actions/profile";
import { Dropdown } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/actions/auth";
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const Profile = () => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [about, setAbout] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [cer, setCer] = useState([]);
  const [certification, setCertification] = useState(false);
  const [info, setInfo] = useState(false);
  const [file, setFile] = useState([]);

  useEffect(() => {
    setCertifications(
      auth.details !== undefined ? auth.details.Achievement : ""
    );
    return () => {};
  }, [auth.details]);

  const aboutForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      about: auth.user.about,
    },
    onSubmit: (values) => {
      let about = values;
      dispatch(updateUserMain({ about, auth }));
      setAbout(false)
    },
  });

  const infoForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      school: auth.user.fullname,
      address: auth.user.address,
      established_on: auth.user.established_on,
    },
    onSubmit: (values) => {
      const info = values;
      dispatch(updateUserMain({ info, auth }));
      setInfo(false)
    },
  });

  const certificationForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: cer._id,
      certificate: cer.certificate,
      details: cer.details,
      file: "",
      user: cer.user,
    },
    onSubmit: (values,{resetForm}) => {
      let achievements = values;
      let achfile = file.length == 0 ? cer.file : file;
      dispatch(updateUserMain({ achievements, achfile, auth }));
      setCertification(false)
      handleCertification(false);
      resetForm()

    },
  });

  const fileHandler = (e) => {
    const file = e.currentTarget.files[0];

    setFile(file);
  };

  const handleCertification = (state, data) => {
    setCertification(state);
    setCer([]);
    if (data) setCer(data);
  };

  return (
    <>
      <div className="col-lg-8">
        <div className="inn-ctn-box mt-4">
          <h2>
            About{" "}
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              onClick={() => setAbout(true)}
            ></i>
          </h2>
          <hr />
          <p>{auth.user.about || null}</p>
        </div>

        <div className="inn-ctn-box mt-4">
          <h2>
            Information Details{" "}
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              onClick={() => setInfo(true)}
            ></i>
          </h2>
          <hr />
          <p>
            <b>School Name</b> : {auth.user.fullname || null}
          </p>
          <p>
            <b>Address</b> : {auth.user.address || null}
          </p>
          <p>
            <b>Founded</b> : {auth.user.established_on || null}
          </p>
        </div>

        <div className="inn-ctn-box mt-4 mb-5">
          <h2>
            Achievements{" "}
            <i
              className="fa fa-plus"
              aria-hidden="true"
              onClick={() => setCertification(true)}
            ></i>
          </h2>
          <hr />

          <div className="cert-box">
            {certifications &&
              certifications.map((cer) => (
                <div className="media" key={cer._id}>
                  {/* <i className="fa fa-certificate mr-3" aria-hidden="true"></i> */}
                  <img
                    src={cer.file ? (cer.file.split('.').pop()==='pdf'?'images/pdfs.png':cer.file) : "images/event-pic.jpg"}
                    onClick={ ()=>dispatch({
                      type: GLOBALTYPES.USERLIST,
                      payload: { show: true, userdata:cer.file,image: true },
                    })}  
                    className="mr-4 img-fluid"
                    style={{ width: "100px", height: "50px" }}
                    alt="..."
                  />
                  <div className="media-body">
                    <h5 className="mt-0">{cer.title}</h5>
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      onClick={() => handleCertification(true, cer)}
                    ></i>
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => {
                        const a = window.confirm(
                          "do you want to delete this achievement"
                        );
                        if (a) {
                          dispatch(updateUserMain({ aid: cer._id, auth }));
                        }
                      }}
                    ></i>
                    <p>{cer.desc}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* about modal */}
      <Modal show={about} onHide={() => setAbout(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-signup" onSubmit={aboutForm.handleSubmit}>
            <div className="form-group">
              <textarea
                id="user-about"
                name="about"
                className="form-control"
                placeholder="About"
                onChange={aboutForm.handleChange}
                value={aboutForm.values.about}
              ></textarea>
              {aboutForm.errors.about ? (
                <small className="text-danger">{aboutForm.errors.about}</small>
              ) : null}
            </div>

            <button className="btn btn-success btn-block" type="submit">
              Save changes
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* info modal */}
      <Modal show={info} onHide={() => setInfo(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-signup" onSubmit={infoForm.handleSubmit}>
            <div className="form-group">
              <input
                required={true}
                type="text"
                id="user-school"
                name="school"
                className="form-control"
                placeholder="School"
                onChange={infoForm.handleChange}
                value={infoForm.values.school}
              />
              {infoForm.errors.school ? (
                <small className="text-danger">{infoForm.errors.school}</small>
              ) : null}
            </div>

            <div className="form-group">
              <textarea
                id="user-address"
                name="address"
                className="form-control"
                placeholder="Address"
                onChange={infoForm.handleChange}
                value={infoForm.values.address}
              ></textarea>
              {infoForm.errors.address ? (
                <small className="text-danger">{infoForm.errors.address}</small>
              ) : null}
            </div>

            <div className="form-group">
              <input
                required={true}
                type="text"
                id="user-established_on"
                name="established_on"
                className="form-control"
                placeholder="Founded"
                onChange={infoForm.handleChange}
                value={infoForm.values.established_on}
              />
              {infoForm.errors.established_on ? (
                <small className="text-danger">
                  {infoForm.errors.established_on}
                </small>
              ) : null}
            </div>

            <button className="btn btn-success btn-block" type="submit">
              Save changes
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* certification modal */}
      <Modal show={certification} onHide={() => handleCertification(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Achievement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="form-signup"
            onSubmit={certificationForm.handleSubmit}
          >
            <div className="form-group">
              <input
                required={true}
                type="text"
                id="user-certificate"
                name="title"
                className="form-control"
                placeholder="Title"
                onChange={certificationForm.handleChange}
                value={certificationForm.values.title}
              />
              {certificationForm.errors.title ? (
                <small className="text-danger">
                  {certificationForm.errors.title}
                </small>
              ) : null}
            </div>

            <div className="form-group">
              <textarea
                id="user-details"
                name="desc"
                className="form-control"
                placeholder="Details"
                onChange={certificationForm.handleChange}
                value={certificationForm.values.desc}
              ></textarea>
              {certificationForm.errors.desc ? (
                <small className="text-danger">
                  {certificationForm.errors.desc}
                </small>
              ) : null}
            </div>

            <div className="form-group">
              <input
                type="file"
                id="user-file"
                name="file"
                placeholder={file!==undefined?file:'null'}
                className="form-control"
                onChange={(e) => fileHandler(e)}
              />
              {certificationForm.errors.file ? (
                <small className="text-danger">
                  {certificationForm.errors.file}
                </small>
              ) : null}
            </div>

            <button className="btn btn-success btn-block" type="submit">
              Save changes
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
