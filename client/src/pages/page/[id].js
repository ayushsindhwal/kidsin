import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import About from "../../components/school/About";
import Followbtn from "../../components/school/followbtn";
import Posts from "../../components/Home/Posts";
import axios from "axios";
import { getDataAPI } from "../../utils/fetchData";
import Status from "../../components/Home/Status";
import StatusModal from "../../components/StatusModal";

const SchoolProfile = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [Followers, setFollowers] = useState("none");
  const [Home, setHome] = useState("block");

  const [fulldata, setFulldata] = useState({});
  const [get, setGet] = useState(false);

  useEffect(() => {
    getDetails();
    return () => {};
  }, []);

  const getDetails = async () => {
    const res = await getDataAPI(`page/${id}`, auth.token);
    setUserData([res.data.pagedetail]);
    setFulldata(res.data);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 school-menu">
            <nav className="navbar navbar-expand-lg">
              <button
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="navbarNav"
                data-target="#navbarNav"
                data-toggle="collapse"
                type="button"
                className="navbar-toggler"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div id="navbarNav" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li
                    className={`nav-item ${Home === "block" ? "active" : null}`}
                  >
                    <a
                      onClick={() => {
                        setFollowers("none");
                        setHome("block");
                      }}
                      className="nav-link"
                    >
                      Home
                    </a>
                  </li>
                  <li
                    className={`nav-item ${
                      Followers === "block" ? "active" : null
                    }`}
                  >
                    <a
                      onClick={() => {
                        setFollowers("block");
                        setHome("none");
                      }}
                      className="nav-link"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {userData.map((user) => (
        <div className="col-lg-9" key={user._id}>
          <div className="school-banner mt-4" style={{}}>
            <div className="media">
              <img
                src={user.image}
                className="mr-4"
                alt="..."
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              />
              <div className="media-body">
                <h5 className="mt-0">
                  {auth.user.verified ? (
                    <>
                      <img src="images/verified.png" alt="" />
                      {user.fullname}
                    </>
                  ) : (
                    user.fullname
                  )}
                </h5>
                <p>{user.address}</p>
                <p>
                  <a href="">
                    <i>
                      Followers<b>({user.followers.length})</b>
                    </i>
                  </a>
                </p>
                {user.createdBy === auth.user._id ? null : (
                  <Followbtn user={user} />
                )}
              </div>
            </div>
          </div>
          {user.createdBy === auth.user._id ? <Status pageid={user} /> : null}
          <Posts st={Home} posted={profile?.details?.post} />
          <About st={Followers} about={user.about} />
        </div>
      ))}
    </div>
  );
};

export default SchoolProfile;
