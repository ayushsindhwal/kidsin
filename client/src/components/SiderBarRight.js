import React from "react";
import { Link } from "react-router-dom";
const SiderBarRight = ({ followers }) => {
  return (
    <div className="col-lg-4">
      <div className="side-light-box-sec mt-4">
        <h3>Pupil in connection</h3>

        {followers !== undefined
          ? followers.map((user) => (
              <Link key={user._id} to={`profile/${user._id}`}>
                <div className="media mb-3">
                  <img
                    src={"/images/no"}
                    className="mr-3"
                    alt="..."
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="media-body">
                    <h5 className="mt-0">{user.fullname}</h5>
                    <p>{user.email}</p>
                  </div>
                </div>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default SiderBarRight;
