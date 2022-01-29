import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <>
      <div className="container">
        <div className="row bootstrap snippets bootdey">
          <div className="col-md-8 col-xs-12">
            <div className="panel" id="followers">
              <div className="panel-heading">
                <h3 className="panel-title"></h3>
              </div>
              {user != undefined
                ? user.map((x) => (
                    <Link className="name" to={x._id}>
                      <div className="panel-body">
                        <ul className="list-group list-group-dividered list-group-full">
                          <li className="list-group-item">
                            <div className="media">
                              <div className="media-left">
                                <a
                                  className="avatar avatar-online"
                                  href="javascript:void(0)"
                                >
                                  <img
                                    src={x.avatar}
                                    alt=""
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                  <i></i>
                                </a>
                              </div>
                              <div className="media-body">
                                <div className="pull-right"></div>
                                <div>
                                  <Link
                                    className="name"
                                    to={"/profile/" + x._id}
                                  >
                                    {x.fullname}
                                  </Link>
                                </div>
                                <small></small>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
