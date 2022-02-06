import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { register } from "../redux/actions/auth";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const validate = (values) => {
  const errors = {};

  if (!values.role) {
    errors.role = "Select an account type!";
  }

  if (values.role === "student" && !values.fullname) {
    errors.fullname = "Enter your name!";
  }

  if (values.role === "school" && !values.fullname) {
    errors.fullname = "Enter school name!";
  }

  if (!values.email) {
    errors.email = "Enter your email!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address!";
  }

  if (!values.password) {
    errors.password = "Enter your password!";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or more";
  }

  if (!values.repassword) {
    errors.repassword = "Confirm your password!";
  } else if (values.repassword !== values.password) {
    errors.repassword = "Password didn't match!";
  }

  return errors;
};

const Register = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (auth.token) {
      history.push("/");
    }
  }, [auth.token, history]);
  const [value, setValue] = useState(null);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      role: "",
      repassword: "",
      address:value==null?"":value.label
    },
    validate,
    onSubmit: (values) => {
      const data={...values,address:value.label}
      
      dispatch(register(data));
      history.push('/confirmemail')
    },
  });
  return (
    <section id="welcome-section">
      <div className="container">
        <div id="logreg-forms">
          <form className="form-signup" onSubmit={formik.handleSubmit}>
            <h1
              className="h3 mb-3 font-weight-normal"
              style={{ textAlign: "center" }}
            >
              {" "}
              Register{" "}
            </h1>

            <div className="form-group">
              <select
                name="role"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.role}
              >
                <option value=""> Select Account Type </option>
                <option value="student"> Student </option>
                <option value="school"> School/Institute </option>
              </select>
              {formik.errors.role ? (
                <small className="text-danger">{formik.errors.role}</small>
              ) : null}
            </div>

            {formik.values.role === "student" && (
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
            )}

            {formik.values.role === "school" && (
              <div className="form-group">
                <input
                  type="text"
                  id="user-school"
                  name="fullname"
                  className="form-control"
                  placeholder="School name"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                />
                {formik.errors.fullname ? (
                  <small className="text-danger">
                    {formik.errors.fullname}
                  </small>
                ) : null}
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                id="user-email"
                name="email"
                className="form-control"
                placeholder="Email address"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <small className="text-danger">{formik.errors.email}</small>
              ) : null}
            </div>

            <div className="form-group">
              <input
                type="password"
                id="user-pass"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <small className="text-danger">{formik.errors.password}</small>
              ) : null}
            </div>

            <div className="form-group">
              <input
                type="password"
                id="user-repeatpass"
                name="repassword"
                className="form-control"
                placeholder="Repeat Password"
                onChange={formik.handleChange}
                value={formik.values.repassword}
              />
              {formik.errors.repassword ? (
                <small className="text-danger">
                  {formik.errors.repassword}
                </small>
              ) : null}
            </div>
            <div className="form-group">

            <input
                  id="user-address"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  value={value==null?formik.values.address:value.label}
                ></input>
            <GooglePlacesAutocomplete
              apiKey="AIzaSyB_dTh5gK_Jw0K-Snt7CG84DarcmxnAOOA"
              selectProps={{
                value,
                onChange: setValue,
              }}
            />
            </div>
            <div className="form-group">
              <button className="btn btn-success btn-block" type="submit">
                Sign Up
              </button>
            </div>

            <Link to="/login" className="text-center text-dark">
              Already Have Account? Login Now
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
