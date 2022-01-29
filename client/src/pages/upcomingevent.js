import React from "react";
import { useSelector } from "react-redux";

const Upcomingevent = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <div className="inn-ctn-box mt-4 mb-5 box-pgn">
        <h2>Upcoming Events</h2>
        <hr />
        {/* loop from here */}
        {auth.details !== undefined
          ? auth.details.user.events.map((event) => (
              <div className="media mb-5 event-box">
                <img
                  src={event.file}
                  className="mr-4"
                  alt="..."
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
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Upcomingevent;
