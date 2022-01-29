import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import { school } from "../redux/actions/profile";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetails } from "../redux/actions/auth";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Userlist from "../components/Userlist";

const validate = (values) => {
  const errors = {};

  // if (!values.user_type) {
  //   errors.user_type = "Select an account type!";
  // }

  // if (!values.full_name) {
  //   errors.full_name = "Enter your name!";
  // }

  return errors;
};

const getFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());

const Courses = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const message = "jsa";
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState([]);
  const [present, setPresent] = useState();

  //updating on changing the data
  useEffect(() => {
    setCourses(auth.details !== undefined ? auth.details.courses : []);
    return () => {};
  }, [auth.details]);

  //updating the global everytime
  useEffect(() => {
    dispatch(getDetails(auth));
    return () => {};
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: course._id,
      file: "",
      title: course.title,
      desc: course.desc,
      price: course.price,
      duration: course.duration,
    },
    validate,
    onSubmit: (values, onSubmitProps) => {
      let course = values;
      
      let coursefile = file==undefined||file.length === 0 ? present : file;

      dispatch(school({ course, coursefile, auth }));
      onSubmitProps.resetForm();

      setFile();
      setCourse([])
      handleClose();
    },
  });

  const handleClose = () => {
    setFile();
    formik.resetForm();
    setCourse([])
    setShow(false);
  };
  const handleShow = (e) => {
    e.preventDefault();

    setShow(true);
  };

  const fileHandler = (e) => {
    const file = e.currentTarget.files[0];
    setFile(file);
  };

  const editCourse = (e, data) => {
    e.preventDefault();
    setPresent(data.file);
    setCourse(data);
    setShow(true);
  };

  const deleteCourse = async (e, id) => {
    e.preventDefault();

    let option = window.confirm("Are you sure?");
    let courseid = id;

    if (option) {
      dispatch(school({ courseid, auth }));
    }
  };

  console.log(courses)

  return (
    <>
      <div className="col-lg-12">
        <div className="inn-ctn-box mt-4 mb-5 box-pgn">
          <div className="event-head">
            <h2>Upcoming Courses</h2>
          </div>
          <div className="event-btn">
            <Link href="" className="followBtn" onClick={(e) => handleShow(e)}>
              Post Courses
            </Link>
          </div>

          {courses.map((course) => (
            <div key={course._id}>
              <hr />
              <div className="media mb-5 mt-5 event-box">
                <img
                  src={course.file ? course.file : "images/cources-img.jpg"}
                  onClick={ ()=>dispatch({
                    type: GLOBALTYPES.USERLIST,
                    payload: { show: true, userdata:course.file,image: true },
                  })} 
                  className="mr-4"
                  alt="..."
                />
                <div className="media-body">
                  <h5 className="mt-0">{course.title || null}</h5>
                  <p className="event-desc">{course.desc || null}</p>

                  <ul>
                    <li className="e-date">
                      <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                      {course.duration || null}
                    </li>
                    {/* <li className="e-time">
                      <i className="fa fa-clock-o" aria-hidden="true"></i> 10.00
                      A.M. - 4.00 P.M.
                    </li> */}
                  </ul>
                  <ul className="edit-del-list">
                    <li className="e-edit">
                      <Link
                        to=""
                        className="followBtn"
                        onClick={(e) => editCourse(e, course)}
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>{" "}
                        Edit Course
                      </Link>
                    </li>
                    <li className="e-delete">
                      <Link
                        href=""
                        className="followBtn-dark"
                        onClick={(e) => deleteCourse(e, course._id)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                        Delete Course
                      </Link>
                    </li>
                    <li>
                    <button
                    className="followBtn"
                    onClick={() =>
                      dispatch({
                        type: GLOBALTYPES.USERLIST,
                        payload: { show: true, userdata:course.participants},
                      })
                    }
                  >
                    Show participants
                  </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Userlist />

      {/* Add Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-signup" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="file"
                id="course-file"
                name="file"
                required={typeof(present)=='string'?false:true}
                className="form-control"
                onChange={(e) => fileHandler(e)}
                placeholder={file!==undefined?file.name:'null'}

              />
              {formik.errors.file ? (
                <small className="text-danger">{formik.errors.file}</small>
              ) : null}
            </div>

            <div className="form-group">
              <input
                required={true}
                type="text"
                id="course-title"
                name="title"
                className="form-control"
                placeholder="Title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.errors.title ? (
                <small className="text-danger">{formik.errors.title}</small>
              ) : null}
            </div>

            <div className="form-group">
              <textarea
                required={true}
                id="course-desc"
                name="desc"
                className="form-control"
                placeholder="Description"
                onChange={formik.handleChange}
                value={formik.values.desc}
              ></textarea>
              {formik.errors.desc ? (
                <small className="text-danger">{formik.errors.desc}</small>
              ) : null}
            </div>

            <div className="form-group">
              <input
                required={true}
                type="text"
                id="course-price"
                name="price"
                className="form-control"
                placeholder="Price"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              {formik.errors.price ? (
                <small className="text-danger">{formik.errors.price}</small>
              ) : null}
            </div>

            <div className="form-group">
              <input
                required={true}
                type="input"
                id="course-duration"
                name="duration"
                className="form-control"
                placeholder="Duration"
                onChange={formik.handleChange}
                value={formik.values.duration}
              />
              {formik.errors.duration ? (
                <small className="text-danger">{formik.errors.duration}</small>
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

export default Courses;
