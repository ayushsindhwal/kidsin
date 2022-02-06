import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import { createPage, deletePage,editPage } from "../redux/actions/profile";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetails } from "../redux/actions/auth";

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
    setCourses(auth.details !== undefined ? auth.details.pages : []);
    return () => {};
  }, [auth,dispatch]);

  //updating the global everytime
  useEffect(() => {
    dispatch(getDetails(auth));
    return () => {};
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
     _id: course._id,
      image:course.image,
      fullname: course.fullname,
      desc: course.desc,
      createdBy:course.createdBy
    },
    validate,
    onSubmit: (values, onSubmitProps) => {

      let coursefile = file==undefined||file.length === 0 ? present : file;
      
      let page = {...values,image:coursefile==undefined?values.image:coursefile};
        if(page._id==undefined)
        {
          dispatch(createPage({ page, auth }));
        }
        else{
          dispatch(editPage({ page, auth }));

        }
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

  const deletePages = async (e, id) => {
    e.preventDefault();

    let option = window.confirm("Are you sure?");
    
    let pageid = id;

    if (option) {
      dispatch(deletePage({ pageid, auth }));
    }
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="inn-ctn-box mt-4 mb-5 box-pgn">
          <div className="event-head">
            <h2>All Pages</h2>
          </div>
          <div className="event-btn">
            <Link href="" className="followBtn" onClick={(e) => handleShow(e)}>
              Create Page
            </Link>
          </div>

          {courses.map((course) => (
            <div key={course._id}>
              <hr />
              <div className="media mb-5 mt-5 event-box">
                <img
                  src={course.image ? course.image : "images/cources-img.jpg"}
                  className="mr-4"
                  style={{ height: 200 }}
                  alt="..."
                />
                <div className="media-body">
                  <h5 className="mt-0">{course.fullname || null}</h5>
                  <p className="event-desc">{course.desc || null}</p>

                  
                  <ul className="edit-del-list">
                  <li className="e-edit">
                      <Link
                        to={`page/${course._id}`}
                        className="followBtn"
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>{" "}
                        View Page
                      </Link>
                    </li>
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
                        Edit Page
                      </Link>
                    </li>
                    <li className="e-delete">
                      <Link
                        href=""
                        className="followBtn-dark"
                        onClick={(e) => deletePages(e, course._id)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                        Delete Page
                      </Link>

                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-signup" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="file"
                id="course-file"
                name="file"
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
                id="course-fullname"
                name="fullname"
                className="form-control"
                placeholder="Pagename"
                onChange={formik.handleChange}
                value={formik.values.fullname}
              />
              {formik.errors.fullname ? (
                <small className="text-danger">{formik.errors.fullname}</small>
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
