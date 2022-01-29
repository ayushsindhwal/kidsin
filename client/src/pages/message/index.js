import React from "react";
import LeftSide from "../../components/message/LeftSide";
const Message = () => {
  return (
    <>
      <div className="container">
        <div className="messaging row">
          <div className="inbox_msg col-lg-12">
            <div className="inbox_people">
              <LeftSide />
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column h-100">
              <i
                className="fab fa-facebook-messenger text-primary"
                style={{ fontSize: "3rem" }}
              />
              <h4>messenger</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
