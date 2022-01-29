import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  resetPasswordLink } from "../redux/actions/auth";
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter your email!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
};

const Forgot = () => {
  const dispatch = useDispatch();
  const [verify, setVerify] = useState(false);

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(resetPasswordLink({ values }));
    },
  });

  const submitForm = async (formData) => {
    const {
      data: { status, message },
    } = await axios.post(process.env.API_URL + "/send-email-otp");

    if (status === "success") {
      setVerify(true);
      sessionStorage.setItem("v_email", formData.email);
    } else {
    }
  };

  return (
    <>
      <section id="welcome-section">
        <div className="container">
          <div id="logreg-forms">
            <form className="form-signin" onSubmit={formik.handleSubmit}>
              <h1
                className="h3 mb-3 font-weight-normal"
                style={{ textAlign: "center" }}
              >
                {" "}
                Recover password
              </h1>

              <div className="form-group">
                <input
                  type="email"
                  id="inputEmail"
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

              <button className="btn btn-success btn-block" type="submit">
                <i className="fas fa-sign-in-alt"></i> Send Reset Link
              </button>
              <hr />
              {/* <p>Don't have an account!</p> */}
              <Link to="/login">
                <button
                  className="btn btn-primary btn-block"
                  type="button"
                  id="btn-signup"
                >
                  {" "}
                  Back to Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forgot;
