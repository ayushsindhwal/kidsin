import React from "react";
import { useSelector } from "react-redux";
const UserCard = ({ user, msg }) => {
  return (
    <div className="chat_list active_chat">
      <div className="chat_people" style={{ display: "flex" }}>
        <div className="chat_img">
          {" "}
          <img
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            src={user.avatar}
            alt={user.fullname}
          />{" "}
        </div>
        <div className="chat_ib">
          <h5>
            {user.fullname}
            <span className="chat_date">{}</span>
          </h5>
          <p>{msg ? user.text : null}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
