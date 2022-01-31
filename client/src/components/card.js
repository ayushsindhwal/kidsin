import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const UserCard = ({ user, currentUser,msg }) => {
  const {id}=useParams()
  return (
    <div className="chat_list active_chat" style={{backgroundColor:currentUser===user._id?'#128ced ':''}}>
      <div className="chat_people" style={{ display: "flex"}}>
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
