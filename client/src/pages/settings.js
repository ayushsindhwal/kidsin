import React,{useState} from "react";
import { Field, Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginPassword } from "../redux/actions/profile";
import { postDataAPI } from "../utils/fetchData";
import axios from "axios";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

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

const Settings = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      password: "",
      repassword: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(resetLoginPassword({password: values.password, oldpassword: values.oldpassword,auth})
      );
    },
  });






  //OTHER SETTINGS
const verification=async()=>{
const res=await postDataAPI('/verifyprofile',{verify:"profile"},auth.token)
dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

}

const sendsettings=async(values)=>{
  const res=await postDataAPI('/hideprofile',values,auth.token)
  dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
}

  return (
    <div style={{width:'50%',margin:'auto',marginTop:'5%'}}>
 <form className="form-signup" onSubmit={formik.handleSubmit}>
   <h3 style={{textAlign:'center'}}> Settings</h3>
      <div className="form-group">
          <h4>current password</h4>
        <input
          type="password"
          id="user-oldpass"
          name="oldpassword"
          className="form-control"
          placeholder="current Password"
          onChange={formik.handleChange}
          value={formik.values.oldpassword}
        />
     
      </div>

      <div className="form-group">
      <h4>new password</h4>
        <input
          type="password"
          id="user-pass"
          name="password"
          className="form-control"
          placeholder="new Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? (
          <small className="text-danger">{formik.errors.password}</small>
        ) : null}
      </div>

      <div className="form-group">
      <h4>enter new password again</h4>

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
          change password
        </button>
      </div>
</form>


{/* Here are other settings */}
<Formik
      initialValues={{
        hideprofile:false,
    
      }}
      onSubmit={async (values) => {
          if(values.hideprofile==="false")
          {
            values.hideprofile=false
          }
          else{
            values.hideprofile=true

          }
          const newvalue={...values,hideprofile:values.hideprofile}
          sendsettings(newvalue)
      }}
    >

{({ values }) => (
        <Form>
          <div role="group" aria-labelledby="my-radio-group">
            <h3>your profile is {auth.user.hideprofile===true?'Hidden':'Unhidden'}</h3>
            <h3>Hide profile</h3>
            <label>
              <Field type="radio" name="hideprofile" value="true" />
              Yes
            </label>
            <label>
              <Field type="radio" name="hideprofile" value="false" />
              No
            </label>
          </div>

      
          <button className="btn btn-success btn-block" type="submit">Save settings</button>
          {auth.user.verified===true?<h3><i className="fas fa-user-check"></i>Your account is verified</h3>:
          <button className="btn btn-success btn-block" onClick={()=>verification()}>Request for verification</button>}
          
        </Form>
      )}
    </Formik>

    </div>
  );
};

export default Settings;
