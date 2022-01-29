import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter your email!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Enter your password!";
  }

  return errors;
};

const Login = () => {
  const { auth } = useSelector((state) => state);

  const history = useHistory();

  useEffect(() => {
    if (auth.token) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [auth.token, history]);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <section id="welcome-section">
      <div className="container">
        <div id="logreg-forms">
          <form className="form-signin" onSubmit={formik.handleSubmit}>
            <h1
              className="h3 mb-3 font-weight-normal"
              style={{ textAlign: "center" }}
            >
              {" "}
              Sign in
            </h1>
            {/* <div className="social-login">
                                <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
                                <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g"></i> Sign in with Google+</span> </button>
                            </div>
                            <p style={{ textAlign: "center" }}> OR  </p> */}
            <div className="form-group">
              <input
                type="email"
                id="inputEmail"
                name="email"
                className="form-control"
                placeholder="Email address"
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <small className="text-danger">{formik.errors.email}</small>
              ) : null}
            </div>

            <div className="form-group">
              <input
                type="password"
                id="inputPassword"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <small className="text-danger">{formik.errors.password}</small>
              ) : null}
            </div>

            <button className="btn btn-success btn-block" type="submit">
              <i className="fas fa-sign-in-alt"></i> Sign in
            </button>
            <Link to="/forgotpassword">Forgot password?</Link>
            <hr />
            <Link to="/confirmtoken/:id">Confirm your email</Link>
            <hr/>
            <Link to="/register">
              <button
                className="btn btn-primary btn-block"
                type="button"
                id="btn-signup"
              >
                Don't Have Account? Create One
              </button>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
