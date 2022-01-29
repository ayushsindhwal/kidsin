import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {  emailConfirm, resetPasswordLink } from "../redux/actions/auth";
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Enter your email!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
};

const Token = () => {
  const dispatch = useDispatch();
  const [verify, setVerify] = useState(false);
  const history=useHistory()

    const {id}=useParams()
    console.log(id)
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted



  useEffect(() => {
    checktoken()
}, []);




  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
        
      dispatch(emailConfirm({ values }));
    },
  });

let B;
  



  const checktoken=async()=>{
    const check=await axios.put(`/api/confirmtoken/${id}`,{id})
    if(check.status==200)
    {
      console.log(check.status)
      setVerify(true)
      // history.push('/login')
    }
}
  return (
verify===true?
<div style={{display:"flex"}}>
<img src="/images/verified.jpg" alt="" style={{width:'40vw'}}/>
<div style={{margin:'auto'}}>
<h2 >your email has been verified</h2>
<Link to="/login">
              <button
                className="btn btn-primary btn-block"
                type="button"
                id="btn-signup"
              >
               Login here
              </button>
</Link>
</div>
</div>:
<section id="welcome-section">
<div className="container">
  <div id="logreg-forms">
    <form className="form-signin" onSubmit={formik.handleSubmit}>
      <h1
        className="h3 mb-3 font-weight-normal"
        style={{ textAlign: "center" }}
      >
        {" "}
        Resend Confirmation Link
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
        <i className="fas fa-sign-in-alt"></i> Send Confirmation Link
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
  );
};

export default Token;
