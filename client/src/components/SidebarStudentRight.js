import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/actions/auth";
import { Link } from "react-router-dom";
const SidebarStudentRight = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [connections, setconnections] = useState([]);
  useEffect(() => {
    setconnections(
      auth.details !== undefined
        ? auth.details.allconnections.realconnections
        : []
    );
    return () => {};
  }, [auth.details]);

  useEffect(() => {
    dispatch(getDetails(auth));
    return () => {};
  }, [dispatch]);

  return (
    <>
      <div className="col-lg-4">
        <div className="right-side-box side-dark-box mt-4">
          <h3>{auth.user.role==='student'?'Friends in your connections':'Pupil in your connections'}</h3>
          {auth.user !== undefined
            ? auth.user.followers.map((user) => (
                <Link key={user._id} to={`profile/${user._id}`}>
                  <div className="media">
                    <img
                      src={user.avatar}
                      className="mr-3"
                      alt="..."
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="media-body">
                      <h5 className="mt-0">{user.fullname}</h5>
                      <p></p>
                    </div>
                  </div>
                </Link>
              ))
            : null}
          <hr />
        </div>
      </div>
    </>
  );
};

export default SidebarStudentRight;
