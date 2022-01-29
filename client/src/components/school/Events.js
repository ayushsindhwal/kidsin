import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { joinEvent } from "../../redux/actions/profile";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Userlist from "../Userlist";
const Events = ({ st, evented }) => {
  const { auth, profile } = useSelector((state) => state);

  const dispatch = useDispatch();
  return (
    <div style={{ display: `${st}` }}>
      <div className="inn-ctn-box mt-4 mb-5 box-pgn">
        <h2>Upcoming Events</h2>
        <hr />
        {/* loop from here */}
        {evented != undefined
          ? evented.map((event) => (
              <div key={event._id} className="media mb-5 event-box">
                <img
                  src={event.file}
                  className="mr-4"
                  alt="..."
                  onClick={ ()=>dispatch({
                    type: GLOBALTYPES.USERLIST,
                    payload: { show: true, userdata:event.file,image: true },
                  })} 
                  style={{ width: "400px", height: "200px" }}
                />
                <div className="media-body">
                  <h5 className="mt-0">{event.title}</h5>
                  <p className="event-desc">{event.desc}</p>
                  <ul>
                    <li className="e-date">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      {event.event_date}
                    </li>
                    <li className="e-time">
                      <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                      {event.event_start_time} {event.event_end_time}
                    </li>
                  </ul>
                  {auth.user.role === "student" ? (
                    event.participants.filter((e) => e._id === auth.user._id)
                      .length !== 0 ? (
                      <button className="followBtn">Joined</button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(
                            joinEvent({ eventId: event._id, auth, profile })
                          )
                        }
                        className="followBtn"
                      >
                        Join Now
                      </button>
                    )
                  ) : null}
                  <button
                    className="followBtn"
                    onClick={() =>
                      dispatch({
                        type: GLOBALTYPES.USERLIST,
                        payload: { show: true, userdata: event.participants },
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

export default Events;
