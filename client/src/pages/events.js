import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { school } from "../redux/actions/profile";
import { Link } from "react-router-dom";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Required";
  }
  if (!values.desc) {
    errors.desc = "Required";
  }

  if (!values.event_date) {
    errors.event_date = "Required";
  }
  if (!values.event_start_time) {
    errors.event_start_time = "Required";
  }
  if (!values.event_end_time) {
    errors.event_end_time = "Required";
  }
  if(values.event_start_time==values.event_end_time)
  {
    errors.event_end_time = "cannot be same";
    errors.event_start_time = "cannot be same";

  }

  return errors;
};

const Events = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const message = "data";
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState([]);
  const [present, setPresent] = useState([]);

  //updating on changing the data
  useEffect(() => {
    setEvents(auth.details !== undefined ? auth.details.events : []);
    return () => {};
  }, [auth.details]);


  const formik = useFormik({
    initialValues: {
      id: event._id,
      file: "",
      title: event.title,
      desc: event.desc,
      event_date: moment(event.event_date).format("YYYY-MM-DD"),
      event_start_time: event.event_start_time,
      event_end_time: event.event_end_time,
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values, onSubmitProps) => {
      let event = values;
      let eventfile = file===undefined||file.length === 0 ? present : file;
      dispatch(school({ event, eventfile, auth }));
      onSubmitProps.resetForm({});
      setFile();
      setEvent([])
      handleClose();    
      setPresent([])


    },
  });

  const handleClose = () => {
    setFile();
    setPresent([])
    setShow(false);
    setEvent([])

  };
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const fileHandler = (e) => {
    const file = e.currentTarget.files[0];
    console.log(file)
    setFile(file);
  };

  const editEvent = (e, data) => {
    e.preventDefault();
    setEvent(data);
    setPresent(data.file);
    setShow(true);
  };

  const deleteEvent = async (e, id) => {
    e.preventDefault();
    let option = window.confirm("Are you sure?");
    let eid = id;
    if (option) {
      dispatch(school({ eid, auth }));
    }
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="inn-ctn-box mt-4 mb-5 box-pgn">
          <div className="event-head">
            <h2>Upcoming Events</h2>
          </div>
          <div className="event-btn">
            <Link to="" className="followBtn" onClick={(e) => handleShow(e)}>
              Post Event
            </Link>
          </div>

          {events.map((event) => (
            <div key={event._id}>
              <hr />
              <div className="media mb-5 event-box">
                <img
                  src={event.file ? event.file : "images/event-pic.jpg"}
                  onClick={() =>
                    dispatch({
                      type: GLOBALTYPES.USERLIST,
                      payload: { show: true, userdata:event.file, image:true},
                    })
                  }
                  className="mr-4 img-fluid"
                  
                  alt="..."
                />
                <div className="media-body">
                  <h5 className="mt-0">{event.title || null}</h5>
                  <p className="event-desc">{event.desc || null}</p>
                  <ul>
                    <li className="e-date">
                      <i className="fa fa-calendar" aria-hidden="true"></i>{" "}
                      {moment(event.event_date).format("MMMM Do, YYYY") || null}
                    </li>
                    <li className="e-time">
                      <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                      {moment(event.event_start_time, "hh").format("LT")} -{" "}
                      {moment(event.event_end_time, "hh").format("LT")}
                    </li>
                  </ul>
                  <ul className="edit-del-list">
                    <li className="e-edit">
                      <Link
                        to=""
                        className="followBtn"
                        onClick={(e) => editEvent(e, event)}
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>{" "}
                        Edit Event
                      </Link>
                    </li>
                    <li className="e-delete">
                      <Link
                        to=""
                        className="followBtn-dark"
                        onClick={(e) => deleteEvent(e, event._id)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                        Delete Event
                      </Link>
                    </li>
                    <li>
                    <button
                    className="followBtn"
                    onClick={() =>
                      dispatch({
                        type: GLOBALTYPES.USERLIST,
                        payload: { show: true, userdata:event.participants},
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

      {/* Add Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-signup" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="file"
                id="event-file"
                name="file"
                className="form-control"
                onChange={(e) => fileHandler(e)}
                placeholder={file!==undefined?file:'null'}
                required={typeof(present)=='string'?false:true}

              />
              {formik.errors.file ? (
                <small className="text-danger">{formik.errors.file}</small>
              ) : null}
            </div>

            <div className="form-group">
              <input
                required={true}
                type="text"
                id="event-title"
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
                id="event-desc"
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
                type="date"
                id="event-date"
                name="event_date"
                className="form-control"
                placeholder="Date"
                onChange={formik.handleChange}
                value={formik.values.event_date}
              />
              {formik.errors.event_date ? (
                <small className="text-danger">
                  {formik.errors.event_date}
                </small>
              ) : null}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    required={true}
                    type="time"
                    id="event-start"
                    name="event_start_time"
                    className="form-control"
                    placeholder="Start Time"
                    onChange={formik.handleChange}
                    value={formik.values.event_start_time}
                  />
                  {formik.errors.event_start_time ? (
                    <small className="text-danger">
                      {formik.errors.event_start_time}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    required={true}
                    type="time"
                    id="event-end"
                    name="event_end_time"
                    className="form-control"
                    placeholder="End Time"
                    onChange={formik.handleChange}
                    value={formik.values.event_end_time}
                  />
                  {formik.errors.event_end_time ? (
                    <small className="text-danger">
                      {formik.errors.event_end_time}
                    </small>
                  ) : null}
                </div>
              </div>
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

export default Events;
