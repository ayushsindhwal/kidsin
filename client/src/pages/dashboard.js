import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import Chips from "react-chips";
import { Dropdown } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSkill, updateUserMain } from "../redux/actions/profile";
import { getDetails } from "../redux/actions/auth";
import { getDataAPI } from "../utils/fetchData";
import SidebarStudentRight from "../components/SidebarStudentRight";
import * as Yup from "yup";
import axios from "axios";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { Document, Page,pdfjs } from 'react-pdf';
import ReactPDF from '@react-pdf/renderer';

const validate = (values) => {
  const errors = {};
  if (!values.about) {
    errors.about = "Cannot be empty";
  }
  if (!values.school) {
    errors.school = "Required";
  }
  if (!values.school) {
    errors.school = "Required";
  }
  if (!values.class_start) {
    errors.class_start = "Required";
  }
  if (!values.start_year) {
    errors.start_year = "Required";
  }
};

const Profile = () => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [edu, setEdu] = useState([]);
  const [skill, setSkill] = useState([]);
  const [cer, setCer] = useState([]);
  const [about, setAbout] = useState(false);
  const [education, setEducation] = useState(false);
  const [skills, setSkills] = useState(false);
  const [schooList, setSchool] = useState([]);
  const [Schooled, setSchooled] = useState([]);
  const [AllSkills, setAllSkills] = useState([]);
  const [certification, setCertification] = useState(false);
  const [file, setFile] = useState({});
  const [disable, setDisable] = useState(false);
  //updating on changing the data
  useEffect(() => {
    setUser(auth.details !== undefined ? auth.details : "");
    getSchooldata();
    getSkills()
    return () => {};
  }, [auth.details]);

  const getSchooldata = async () => {
    const res = await getDataAPI("generaldata", auth.token);

    setSchool(res.data.data);
  };

  //delete education
  const deleteEducation = (eduid) => {
    const a=window.confirm("do you want to delete this ")
    if(a==true)
    {
      dispatch(updateUserMain({ eduid, auth }));
    }
    else{
      return null
    }
  };
  //delete Certificate
  const deleteCertificate = (cid) => {
    const a=window.confirm("do you want to delete this ")
    if(a==true)
    {
      dispatch(updateUserMain({ cid, auth }));
    }
    else{
      return null
    }
  };

  const aboutForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      about: auth.user.about,
    },
    validate,
    onSubmit: (values, onSubmitProps) => {
      let about = values;
      dispatch(updateUserMain({ about, auth }));
      onSubmitProps.resetForm();
      setAbout(false);
    },
  });

  const handleEducation = (state, data) => {
    educationForm.resetForm();
    console.log(data)
    setFile();
    setEducation(state);
    setEdu([]);
    if (data) setEdu(data);
  };

  const handleCertification = (state, data) => {
    certificationForm.resetForm();
    if(state==false)
    {
      setCertification(state);
      setCer([]);
      setFile()
    }
    else{
      setCertification(state);
      setCer([]);
      setFile(data.file);
      if (data) setCer(data);
    }
    
  };

  const handleChange = (chips) => {
    setSkill(chips);
  };

  const fileHandler = (e) => {
    const file = e.currentTarget.files[0];
    setFile(file);
  };

  const educationForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: edu._id,
      school: Schooled,
      class_start: edu.class_start,
      class_end: edu.class_end,
      start_year: edu.start_year,
      end_year: edu.end_year,
      user: edu.user,
    },
    validate,
    onSubmit: (values, onSubmitProps) => {
      let education = values;
      dispatch(updateUserMain({ education, auth }));
      setEducation(false);
      onSubmitProps.resetForm();
      setSchooled();
    },
  });

  const skillsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      skill: skill,
    },
    onSubmit: (values) => {
      let skills = values;
      dispatch(updateUserMain({ skills, auth }));
      setSkills(false);
      setSkill([]);
    },
  });

  const getSkills=async()=>{
    const res=await axios.get('/api/allskills')
    const allskill=[]
      for(let i of res.data)
      {
        allskill.push(i.name)
      }
    setAllSkills(allskill)
  }

  const certificationForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: cer._id,
      certificate: cer.certificate,
      details: cer.details,
      file: "",
      user: cer.user,
    },
    onSubmit: (values, onSubmit) => {
      let certificated = values;
      let certfile = file.length === 0 ? cer.file : file;
      dispatch(updateUserMain({ certificated, certfile, auth }));
      onSubmit.resetForm();
      setFile();
      setCertification(false);
    },
  });

  var schoolOptions = [];

  schooList.map((names, i) =>
    schoolOptions.push({
      key: names._id,
      value: names.schoolname,
      text: names.schoolname,
    })
  );
  const handleOnchange = (e, data) => {
    setSchooled(data.value);
  };

  return (
    <div>
      <div className="row">
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
            <p>{auth.user !== undefined ? auth.user.about : null}</p>
          </div>
          <div className="inn-ctn-box">
            <h2>
              Education{" "}
              <i
                className="fa fa-plus"
                aria-hidden="true"
                onClick={() => setEducation(true)}
              ></i>
            </h2>
            <hr />
            {(user.education &&
              user.education.map((edu) => (
                <div className="media mb-4" key={edu._id}>
                  <img
                    src={
                      "/schoologo/" +
                      (edu.profile)
                    }
                    onClick={ ()=>dispatch({
                      type: GLOBALTYPES.USERLIST,
                      payload: { show: true, userdata:"/schoologo/"+edu.profile,image: true },
                    })} 
                    className="mr-4"
                    alt="..."
                    style={{ width: "100px", height: "50px" }}
                  />
                  <div className="media-body">
                    <h5 className="mt-0">{edu.school}</h5>
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      onClick={() => handleEducation(true, edu)}
                    ></i>
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => deleteEducation(edu._id)}
                    ></i>
                    <p>
                      Class-{edu.class_start} to {edu.class_end}
                    </p>
                    <p className="year-txt">
                      {edu.start_year} - {edu.end_year}
                    </p>
                  </div>
                </div>
              ))) ||
              null}
          </div>

          <div className="inn-ctn-box mt-4">
            <h2>
              Skills{" "}
              <i
                className="fa fa-pencil"
                aria-hidden="true"
                onClick={() => setSkills(true)}
              ></i>
            </h2>
            <hr />
            <ul className="skill-list">
              {(user.skill &&
                user.skill.map((skill, i) => (
                  <li
                    style={{ display: "flex", justifyContent: "space-between" }}
                    key={i}
                  >
                    <h3>{skill.skill}</h3>
                    <i
                      onClick={() =>
                        dispatch(deleteSkill({ skillId: skill._id, auth }))
                      }
                      className="fa fa-times"
                      aria-hidden="true"
                    ></i>
                  </li>
                ))) ||
                null}
            </ul>
          </div>

          <div className="inn-ctn-box mt-4 mb-5">
            <h2>
              Certification{" "}
              <i
                className="fa fa-plus"
                aria-hidden="true"
                onClick={() => setCertification(true)}
              ></i>
            </h2>
            <hr />

            <div className="cert-box">
              {(user.certification &&
                user.certification.map((cer) => (
                  <div className="media" key={cer._id}>
                    {}
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
                      <h5 className="mt-0">{cer.certificate}</h5>
                      <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                        onClick={() => handleCertification(true, cer)}
                      ></i>
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        onClick={() => deleteCertificate(cer._id)}
                      ></i>
                      <p>{cer.details}</p>
                    </div>
                  </div>
                ))) ||
                null}
            </div>
          </div>

          {/* about modal */}
          <Modal show={about} onHide={() => setAbout(false)}>
            <Modal.Header closeButton>
              <Modal.Title>About</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="form-signup" onSubmit={aboutForm.handleSubmit}>
                <div className="form-group">
                  <textarea
                    required={true}
                    id="user-about"
                    name="about"
                    className="form-control"
                    placeholder="About"
                    onChange={aboutForm.handleChange}
                    value={aboutForm.values.about}
                  ></textarea>
                  {aboutForm.errors.about ? (
                    <small className="text-danger">
                      {aboutForm.errors.about}
                    </small>
                  ) : null}
                </div>

                <button className="btn btn-success btn-block" type="submit">
                  Save changes
                </button>
              </form>
            </Modal.Body>
          </Modal>

          {/* education modal */}
          <Modal show={education} onHide={() => handleEducation(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Education</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                className="form-signup"
                onSubmit={educationForm.handleSubmit}
              >
                <div className="form-group">
                  <input
                    required={true}
                    type="text"
                    id="user-school"
                    name="school"
                    className="form-control"
                    placeholder="Other  School enter here"
                    onChange={educationForm.handleChange}
                    value={educationForm.values.school}
                  />
                  <Dropdown
                    name="school"
                    onChange={handleOnchange}
                    placeholder="Select School"
                    fluid
                    search
                    selection
                    options={schoolOptions}
                  />

                  {educationForm.errors.school ? (
                    <small className="text-danger">
                      {educationForm.errors.school}
                    </small>
                  ) : null}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        required={true}
                        type="text"
                        id="user-class_start"
                        name="class_start"
                        className="form-control"
                        placeholder="Start Class"
                        onChange={educationForm.handleChange}
                        value={educationForm.values.class_start}
                      />
                      {educationForm.errors.class_start ? (
                        <small className="text-danger">
                          {educationForm.errors.class_start}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        required={true}
                        type="text"
                        id="user-class_end"
                        name="class_end"
                        className="form-control"
                        placeholder="End Class"
                        onChange={educationForm.handleChange}
                        value={educationForm.values.class_end}
                      />
                      {educationForm.errors.class_end ? (
                        <small className="text-danger">
                          {educationForm.errors.class_end}
                        </small>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        required={true}
                        type="number"
                        id="user-start_year"
                        name="start_year"
                        className="form-control"
                        placeholder="Start Year"
                        onChange={educationForm.handleChange}
                        value={educationForm.values.start_year}
                      />
                      {educationForm.errors.start_year ? (
                        <small className="text-danger">
                          {educationForm.errors.start_year}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        required={true}
                        type="number"
                        id="user-end_year"
                        name="end_year"
                        className="form-control"
                        placeholder="End Year"
                        onChange={educationForm.handleChange}
                        value={educationForm.values.end_year}
                      />
                      {educationForm.errors.end_year ? (
                        <small className="text-danger">
                          {educationForm.errors.end_year}
                        </small>
                      ) : null}
                    </div>
                  </div>
                </div>

                <button
                  disabled={disable}
                  className="btn btn-success btn-block"
                >
                  Save changes
                </button>
              </form>
            </Modal.Body>
          </Modal>

          {/* skills modal */}
          <Modal
            show={skills}
            onHide={() => {
              setSkill([]);
              setSkills(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Skills</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="form-signup" onSubmit={skillsForm.handleSubmit}>
                <div className="form-group">
                  <Chips
                    required={true}
                    name="skill"
                    className="form-control"
                    placeholder="Skill"
                    onChange={handleChange}
                    value={skill}
                    suggestions={AllSkills}
                  />
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
              <Modal.Title>Certification</Modal.Title>
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
                    name="certificate"
                    className="form-control"
                    placeholder="Certificate"
                    onChange={certificationForm.handleChange}
                    value={certificationForm.values.certificate}
                  />
                  {certificationForm.errors.certificate ? (
                    <small className="text-danger">
                      {certificationForm.errors.certificate}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <textarea
                    required={true}
                    id="user-details"
                    name="details"
                    className="form-control"
                    placeholder="Details"
                    onChange={certificationForm.handleChange}
                    value={certificationForm.values.details}
                  ></textarea>
                  {certificationForm.errors.details ? (
                    <small className="text-danger">
                      {certificationForm.errors.details}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <input
                    type="file"
                    name="file"
                    id="user-file"
                    className="form-control"
                    onChange={(e) => fileHandler(e)}
                    placeholder={file!==undefined?file.name:'null'}
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
        </div>
        <SidebarStudentRight />
      </div>
    </div>
  );
};

export default Profile;
