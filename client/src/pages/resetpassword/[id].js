import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions/auth";
const validate = (values) => {
  const errors = {};
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

const Resetpassword = ({ match }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      repassword: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      console.log(match.params.id);
      dispatch(
        resetPassword({ password: values.password, token: match.params.id })
      );
    },
  });

  return (
    <div id="logreg-forms">
      <h3>Reset Password</h3>
      <form className="form-signup" onSubmit={formik.handleSubmit}>
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
            <small className="text-danger">{formik.errors.repassword}</small>
          ) : null}
        </div>

        <div className="form-group">
          <button className="btn btn-success btn-block" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Resetpassword;
