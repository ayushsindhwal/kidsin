import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";
import './id.css'
const Conversation = () => {
  const style =  {

  }
  return (
    <div className="messagexyz d-flex">
      <div className="col-md-4 border-right px-0 hellostyle">
        <LeftSide />
      </div>
      <div className="col-md-8 px-0">
        <RightSide />
      </div>
    </div>
    
  );
};

export default Conversation;
