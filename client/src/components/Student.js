import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Connections, getProfileUsers } from "../redux/actions/profile";
import Posts from "./ProfilePost";

import MainHeader from "./MainHeader";
import { getDataAPI } from "../utils/fetchData";
// import { getDetails } from '../redux/actions/auth'
import About from "./profile/About";
import Skills from "./profile/Skills";
import Certificate from "./profile/Certificate";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Userlist from "./Userlist";


const Student = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [CurrentStatus, setCurrentStatus] = useState("Connect");
  const [userData, setUserData] = useState([]);
  const [fulldata, setFulldata] = useState([]);

  useEffect(() => {
    dispatch(getProfileUsers({ users: profile.users, id, auth }));
    const newData = profile.users.filter((user) => user._id === id);
    setUserData(newData);
    setFulldata(profile.details);

    return () => {
    };
  }, [dispatch, profile.details, auth, id, profile.users, profile.details]);

  const [Event, setEvent] = useState("none");
  const [Abouts, setAbouts] = useState("block");
  const [Home, setHome] = useState("none");
  const [Courses, setCourses] = useState("none");
  return (
    <>
      <div className="d-flex" id="wrapper">
        {userData !== undefined
          ? userData.map((user) => (
              <div key={user._id} className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">
                <div className="logo">
          <img
                  src="/images/logo.png"
                  className=" mb-2"
                  style={{width:'50px',height:'50px'}}

                  alt=""
                />          </div>
                </div>
                <div className="sidebar-heading">
                 { user.hideprofile===false?<img
                    src={user.avatar}
                    className="img-fluid"
                    onClick={() =>
                      dispatch({
                        type: GLOBALTYPES.USERLIST,
                        payload: { show: true, userdata:user.avatar},
                      })
                    }
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />:null}

                  <h3>{user.fullname}</h3>
                  <p className="school-name">{user.email}</p>
                  {/* <p className="class-name">Class-V</p>   */}
                  {auth.user._id !== user._id &&
                  fulldata.statusBetween === undefined ? (
                    <button
                      className="followBtn"
                      disabled={CurrentStatus === "Pending" ? true : false}
                      onClick={(e) => {
                        setCurrentStatus("Pending");
                        dispatch(
                          Connections({
                            userId: auth.user._id,
                            friendId: user._id,
                            auth,
                            type: "Send",
                          })
                        );
                      }}
                    >{`${CurrentStatus}`}</button>
                  ) : auth.user._id === user._id ? null : (
                    <>
                    <button className="followBtn">
                        {fulldata.statusBetween}
                    </button>
                    {fulldata.statusBetween=='Connected'?
                    <Link className="followBtn Dark" to={`/message/${id}`}>
x                          Chat
                       </Link>:null
                  }
                       </>
                  )}
                </div>
                <hr />
                <div className="connection-heading list-group list-group-flush">
                  <h3>
                    <span>
                      <i className="fa fa-users" aria-hidden="true"></i>
                    </span>{" "}
                    <span>Connections</span>{" "}
                    <span className="con-no">({user.followers.length})</span>
                  </h3>
                </div>
                <hr />
                <div className="connection-heading group-box"></div>
                <hr />
                <div className="connection-heading courses-box"></div>
              </div>
            ))
          : null}
        <div id="page-content-wrapper">
          <MainHeader />

          {/* <div className="container-fluid">
	  <div className="row">
	    <div className="col-lg-8">
        <Posts posted={fulldata.post}/>
</div>
</div>
</div> */}

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
                <i className="fas fa-bars"></i>

                  </button>
                  <div id="navbarNav" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                    <li
                        className={`nav-item ${
                          Abouts === "block" ? "active" : null
                        }`}
                      >
                        <a
                          onClick={() => {
                            setEvent("none");
                            setAbouts("block");
                            setHome("none");
                            setCourses("none");
                          }}
                          className="nav-link"
                        >
                          About
                        </a>
                      </li>
         
                      <li
                        className={`nav-item ${
                          Home === "block" ? "active" : null
                        }`}
                      >
                        <a
                          onClick={() => {
                            setEvent("none");
                            setAbouts("none");
                            setHome("block");
                            setCourses("none");
                          }}
                          className="nav-link"
                        >
                          Posts
                        </a>
                      </li>
             <li
                        className={`nav-item ${
                          Event === "block" ? "active" : null
                        }`}
                      >
                        <a
                          className="nav-link"
                          onClick={() => {
                            setEvent("block");
                            setAbouts("none");
                            setHome("none");
                            setCourses("none");
                          }}
                        >
                          Skills
                        </a>
                      </li>
                      <li
                        className={`nav-item ${
                          Courses === "block" ? "active" : null
                        }`}
                      >
                        <a
                          className="nav-link"
                          onClick={() => {
                            setEvent("none");
                            setAbouts("none");
                            setHome("none");
                            setCourses("block");
                          }}
                        >
                          Certificate
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <Posts posted={fulldata.post} st={Home} id={id} />
              <About data={fulldata} st={Abouts} />
              <Certificate data={fulldata} st={Courses} />
              <Skills data={fulldata} st={Event} />
            </div>
          </div>
        </div>
      </div>
      <Userlist/>
    </>
  );
};

export default Student;
