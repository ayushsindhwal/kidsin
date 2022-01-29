import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Connections, getProfileUsers } from "../../redux/actions/profile";
import About from "../../components/school/About";
import Events from "../../components/school/Events";
import Followbtn from "../../components/school/followbtn";
import Posts from "../../components/Home/Posts";
import Coursed from "../../components/school/Courses";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const SchoolProfile = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [Event, setEvent] = useState("none");
  const [Abouts, setAbouts] = useState("none");
  const [Home, setHome] = useState("block");
  const [Courses, setCourses] = useState("none");
  const [fulldata, setFulldata] = useState({});
  const [get, setGet] = useState(false);

  useEffect(() => {
    dispatch(getProfileUsers({ users: profile.users, id, auth }));
    const newData = profile.users.filter((user) => user._id === id);
    setUserData(newData);
    setFulldata(profile.details);

    return () => {};
  }, [id, auth, dispatch, profile.details, profile.users]);

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
                <i className="fas fa-bars"></i>
              </button>

              <div id="navbarNav" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li
                    className={`nav-item ${Home === "block" ? "active" : null}`}
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
                      Home
                    </a>
                  </li>
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
                      Upcoming Event
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
                      Courses
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {userData.map((user) => (
        <div className="col-lg-12 " key={user._id}>
          <div className="school-banner mt-4  ">
            <div className="media cssflex">
              <img
                src={user.avatar}
                className="mr-4 cssfleximg"
                alt="..."
                onClick={() =>
                  dispatch({
                    type: GLOBALTYPES.USERLIST,
                    payload: { show: true, userdata:user.avatar,image:true},
                  })
                }
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              />
              <div className="media-body">
                <h5 className="mt-0">{auth.user.verified?<><img src="images/verified.png" alt="" srcset="" />{auth.user.fullname}</>:user.fullname}</h5>
                <p>{user.address}</p>
                <p>
                  <a href="">
                    <i>
                      Followers<b>({user.followers.length})</b>
                    </i>
                  </a>
                </p>
                {user._id === auth.user._id ? null : <Followbtn user={user} />}
              </div>
            </div>
          </div>

          <Posts st={Home} posted={fulldata.post} />
          <About st={Abouts} about={user.about} />
          <Events st={Event} get={setGet} evented={fulldata.events} />
          <Coursed st={Courses} get={setGet} coursed={fulldata.courses} />
        </div>
      ))}
    </div>
  );
};

export default SchoolProfile;
