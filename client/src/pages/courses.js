import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Userlist from "../components/Userlist";
const Courses = () => {
  const { auth } = useSelector((state) => state);
const dispatch=useDispatch()
  return (
    <div className="col-lg-12">
      <div className="inn-ctn-box mt-4 mb-5 box-pgn">
        <div className="event-head">
          <h2>Courses You Applied for</h2>
        </div>
        <hr />
        {auth.details !== undefined
          ? auth.details.user.courses.map((i) => (
              <div key={i._id} className="media mb-5 event-box">
                <img
                  src={i.file}
                  onClick={ ()=>dispatch({
                    type: GLOBALTYPES.USERLIST,
                    payload: { show: true, userdata:i.file,image: true },
                  })} 
                  className="mr-4"
                  alt="..."
                  style={{ width: "250px", height: "150px" }}
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
                    <li>
                    <button
                    className="followBtn"
                    onClick={() =>
                      dispatch({
                        type: GLOBALTYPES.USERLIST,
                        payload: { show: true, userdata:i.participants},
                      })
                    }
                  >
                    Show participants
                  </button>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Courses;
