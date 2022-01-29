import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth";
import Search from "./Header/Search";
import $ from "jquery";

const MainHeader = () => {
  //you get the state here
  const { auth, notify } = useSelector((state) => state);
  const [Show, setShow] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    
    return () => {};
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button className="btn btn-primary" id="menu-toggle">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>
        <div className="search-container topnav">
          <Search />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0 top-right-menu">
            <li className="nav-item">
              <Link  className="nav-link" to="/">
                <span>
                  <i className="fa fa-home" aria-hidden="true"></i>
                </span>{" "}
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                
                className="nav-link"
                to="/message"
              >
                <span>
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>{" "}
                <span>Message</span>{" "}
              </Link>
            </li>
            <li className="nav-item ">
              <Link      
                              className="nav-link"
           
 to="/notifications">
         
<span>Notification</span>{" "}
<i className="fa fa-bell"></i>
                  <span                 
 className="colred">{notify.data.length}</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                

                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                {auth.user != undefined ? auth.user.fullname : null}
              </Link>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item"
                  to={
                    auth.user.role === "student"
                      ? `/profile/${
                          auth.user !== undefined ? auth.user._id : null
                        }`
                      : `/school/${
                          auth.user !== undefined ? auth.user._id : null
                        }`
                  }
                >
                  profile
                </Link>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
                <div className="dropdown-divider"></div>
                <Link
                  className="dropdown-item"
                  to="/logout"
                  onClick={() => dispatch(logout())}
                >
                  Sign Out
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MainHeader;
