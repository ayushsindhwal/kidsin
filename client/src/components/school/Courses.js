import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse } from "../../redux/actions/profile";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Userlist from "../Userlist";
const Courses = ({ coursed, st, get }) => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div style={{ display: st }} className="col-lg-12">
      <div className="inn-ctn-box mt-4 mb-5 box-pgn">
        <div className="event-head">
          <h2>Courses Offered</h2>
        </div>
        <hr />
        {coursed !== undefined
          ? coursed.map((i) => (
              <div key={i._id} className="media mb-5 event-box">
                <img
                  src={i.file}
                  className="mr-4"
                  alt="..."
                  style={{ width: "250px", height: "150px" }}
                  onClick={() =>
                    dispatch({
                      type: GLOBALTYPES.USERLIST,
                      payload: { show: true, userdata:i.file,image:true},
                    })
                  }
                />
                <div className="media-body">
                  <h5 className="mt-0">{i.title}</h5>
                  <p className="event-desc">{i.desc}</p>
                  <ul>
                    <li className="e-date">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      {moment(i.event_date).format("MMMM Do, YYYY") || null}
                    </li>
                    <li className="e-time">
                      <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                      <span>duration</span> {i.duration}
                    </li>
                  </ul>
                  {auth.user.role === "student" ? (
                    i.participants.filter((e) => e._id === auth.user._id)
                      .length !== 0 ? (
                      <button className="followBtn">Enrolled</button>
                    ) : (
                      <button
                        className="followBtn"
                        onClick={() => {
                          get(true);
                          dispatch(
                            enrollCourse({ courseId: i._id, auth, profile })
                          );
                        }}
                      >
                        Enroll Now
                      </button>
                    )
                  ) : null}
                  <button
                    className="followBtn"
                    onClick={() =>
                      dispatch({
                        type: GLOBALTYPES.USERLIST,
                        payload: { show: true, userdata: i.participants },
                      })
                    }
                  >
                    Show participants
                  </button>
                </div>
              </div>
            ))
          : null}
        <Userlist />
      </div>
    </div>
  );
};

export default Courses;
