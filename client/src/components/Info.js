import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { userProfileUpdate } from "../redux/actions/profile";
import SidebarStudent from "./SidebarStudent";
import SidebarStudentRight from "./SidebarStudentRight";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Info = () => {
  const [user, setUser] = useState([]);
  const [dob, setDob] = useState("");
  const [show, setShow] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, setValue] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: auth.user.fullname,
      dob: dob,
      gender: auth.user.gender,
      mom_name: auth.user.mom_name,
      dad_name: auth.user.dad_name,
      address: value==null?auth.user.address:value.label,
      mobile: auth.user.mobile,
    },


    onSubmit: (values) => {
      
      dispatch(userProfileUpdate({ values, auth }));
      handleClose();
    },
  });



  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <div className="inn-ctn-box mt-4">
            <h2>
              Personal Information{" "}
              <i
                className="fa fa-pencil"
                aria-hidden="true"
                onClick={() => handleShow()}
              ></i>
            </h2>
            <hr />
            <p>
              <b>First Name</b> : {auth.user.fullname || null}
            </p>
            <p>
              {}
              <b>Age</b> :{" "}
              {moment().diff(moment(auth.user.dob), "years", false) || null}
            </p>
            <p>
              <b>Birthday</b> :{" "}
              {auth.user.dob==null?null:moment(auth.user.dob).format("MMMM Do, YYYY") || null}
            </p>
            <p>
              <b>Gender</b> : {auth.user.gender || null}
            </p>

            <p>
              <b>Mom's Name</b> : {auth.user.mom_name || null}
            </p>
            <p>
              <b>Dad's Name</b> : {auth.user.dad_name || null}
            </p>
            <p>
              <b>Address</b> : {auth.user.address || null}
            </p>
            <p>
              <b>Phone No.</b> : {auth.user.mobile || null}
            </p>
          </div>
        </div>
        

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Personal information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-signup" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="user-name"
                  name="fullname"
                  className="form-control"
                  placeholder="Full name"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                />
                {formik.errors.fullname ? (
                  <small className="text-danger">
                    {formik.errors.fullname}
                  </small>
                ) : null}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    
                      <input style={{width:'100%',height:'100%'}}  onChange={formik.handleChange} value={formik.values.dob}    type="date" id="birthday" name="dob"/>

                    {formik.errors.dob ? (
                      <small className="text-danger">{formik.errors.dob}</small>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <select
                      name="gender"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                    >
                      <option value=""> Select Gender </option>
                      <option value="Male"> Male </option>
                      <option value="Female"> Female </option>
                    </select>
                    {formik.errors.gender ? (
                      <small className="text-danger">
                        {formik.errors.gender}
                      </small>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* <div className="form-group">
              <input
                type="text"
                id="user-school"
                name="school"
                className="form-control"
                placeholder="School"
                onChange={formik.handleChange}
                value={formik.values.school}
              />
              {formik.errors.school ? (
                <small className="text-danger">{formik.errors.school}</small>
              ) : null}
            </div> */}

              <div className="form-group">
                <input
                  type="text"
                  id="user-mom_name"
                  name="mom_name"
                  className="form-control"
                  placeholder="Mom's Name"
                  onChange={formik.handleChange}
                  value={formik.values.mom_name}
                />
                {formik.errors.mom_name ? (
                  <small className="text-danger">
                    {formik.errors.mom_name}
                  </small>
                ) : null}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="user-dad_name"
                  name="dad_name"
                  className="form-control"
                  placeholder="Dad's Name"
                  onChange={formik.handleChange}
                  value={formik.values.dad_name}
                />
                {formik.errors.dad_name ? (
                  <small className="text-danger">
                    {formik.errors.dad_name}
                  </small>
                ) : null}
              </div>

              <div className="form-group">
                <h6>current address</h6>
                <input
                  id="user-address"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  value={value==null?formik.values.address:value.label}
                />
                    <GooglePlacesAutocomplete
      apiKey="AIzaSyB_dTh5gK_Jw0K-Snt7CG84DarcmxnAOOA"
      selectProps={{
        value,
        onChange: setValue,
      }}
    />
                {formik.errors.address ? (
                  <small className="text-danger">{formik.errors.address}</small>
                ) : null}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="user-mobile"
                  name="mobile"
                  className="form-control"
                  placeholder="Phone No."
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                />
                {formik.errors.mobile ? (
                  <small className="text-danger">{formik.errors.mobile}</small>
                ) : null}
              </div>

              <button className="btn btn-success btn-block" type="submit">
                Save changes
              </button>
            </form>
          </Modal.Body>
        </Modal>
        <SidebarStudentRight />
      </div>
    </>
  );
};

export default Info;
