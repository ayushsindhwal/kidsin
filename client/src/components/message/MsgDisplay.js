import React from "react";
import Message from "../../pages/message";

const MsgDisplay = ({ user, msg, theme }) => {
  return (
    <>
      <div className="chat_title">
        <img
          src={user.avatar}
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
        />
        <span>{user.fullname}</span>
      </div>
      {msg.text && <div className="chat_text">{msg.text}</div>}
      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MsgDisplay;
