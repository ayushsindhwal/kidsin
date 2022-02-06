import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import moment from "moment";
import { deleteNotify, removeNotify } from "../redux/actions/notify";
const NotifyModal = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIsRead = (e, msg) => {
    e.preventDefault();
    
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h3>Notifications</h3>
        {notify.sound ? (
          <i
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            className="fas fa-bell text-danger"
          />
        ) : (
          <i
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            className="fas fa-bell-slash text-danger"
          />
        )}
        {notify.data.length}
      </div>
      <hr />
      <div
        onClick={() => dispatch(deleteNotify({ auth }))}
        className="text-right text-danger mr-2"
        style={{ cursor: "pointer" }}
      >
        Delete All
      </div>
      {
        // notify.data.length===0&&<img src={} alt=""/>
      }
      <div style={{ maxHeight: "calc(100vh-200px)", overflow: "auto" }}>
        {notify.data.map((msg, index) => (

          <div key={index} className="px-2 mb-3">
            {                  
}
            <Link
              onClick={() => dispatch(removeNotify({ msg, auth }))}
              to={msg.url}
              className="d-flex text-dark align-items-center"
            >
              <Avatar src={msg.user.avatar} size={"30px"} />
              <div className="mx-1 flex-fill">
                <div>
                  <strong className="mr-1">{msg.user.fullname}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>
            </Link>

            <div style={{ width: "30px" }}>
              {msg.image && <Avatar src={msg.image} size={"20px"} />}
            </div>
            <i
              className="fas fa-times"
              onClick={() => dispatch(removeNotify({ msg, auth }))}
            />

            <small className="text-muted d-flex justify-content-between px-2">
              {moment(msg.createdAt).fromNow()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotifyModal;
