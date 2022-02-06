import React from "react";
import { Link } from "react-router-dom";
import Message from "../../pages/message";

const MsgDisplay = ({ user, msg, theme }) => {
  return (
    <>
      <Link to={`/profile/${user._id}`}>
      <div className="chat_title">
        <img
          src={user.avatar}
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
        />
        <span>{user.fullname}</span>
      </div>
      </Link>
      {msg.text && <div className="chat_text" style={{width:'10vw',wordBreak:'break-word'}}>{msg.text}</div>}
      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MsgDisplay;
