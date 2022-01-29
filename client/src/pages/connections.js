import React from "react";
import axios from "axios";
import qs from "qs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Connections, unfollow, updateUserMain } from "../redux/actions/profile";
import { getDetails } from "../redux/actions/auth";
import { Link } from "react-router-dom";
const Connection = () => {
  const { auth, profile,socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [Connection, setConnections] = useState([]);
  const [Request, setRequest] = useState([]);
  const [Pending, setPending] = useState([]);
  const [realConnections, setrealconnections] = useState([]);
  useEffect(() => {
    setConnections(
      auth.details !== undefined ? auth.details.allconnections : ""
      
    );
    setrealconnections(auth.user.followers);

    return () => {};
  }, [auth.details,auth.user]);

  useEffect(() => {
    setRequest(Connection.request);
    setPending(Connection.pending);

  }, [Connection]);
  const school=[]
  for(let i of auth.user.following)
  {
    if(i.role==='school')
    {
      school.push(i)
    }
  }
  return (
    <>
      <div className="bar">
        <p></p>
      </div>
      <div className="col-lg-12">
        <div className="inn-ctn-box mt-4">
          <h2>
            Friends in your connections:{" "}
            {realConnections !== undefined ? realConnections.length : 0}
          </h2>
          <hr />
          <div className="row">
            {realConnections !== undefined
              ? realConnections.map((row) => (
                  <>
                    <div className="col-lg-4" key={row.card}>
                      <div className="connection-box">
                        <Link to={`profile/${row._id}`}>
                          <img
                            src={
                              row.avatar != null
                                ? row.avatar
                                : "images/noprofile.png"
                            }
                            className="img-fluid"
                            alt="..."
                          />
                          {}
                          <h5 className="mt-0">{row.fullname}</h5>
                          {/* <p className="sl-name">EuroKids Preschool</p>
                <p>
                  <i className="fa fa-users" aria-hidden="true"></i> 21 mutual
                  friend
                </p> */}
                        </Link>
                        <Link
                           className="followBtn-dark"
                           to={`message/${row._id}`}
                          >
                            Chat
                          </Link>
                        <div className="connection-body">
                      
                          <div
                            className="followBtn-dark"
                            onClick={() =>
                              dispatch(
                                Connections({
                                  conid: row._id,
                                  auth,
                                  type: "DeleteFriend",
                                })
                              )
                            }
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                            Remove Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              : null}
          </div>
          <div className="inn-ctn-box mt-4">
            <h2>Pending:{Pending !== undefined ? Pending.length : 0}</h2>
            <hr />
            <div className="row">
              {Pending != undefined
                ? Pending.map((row) => (
                    <div className="col-lg-4" key={row._id}>
                      <div className="connection-box">
                        <Link to={`profile/${row.to._id}`}>
                          <img
                            src={
                              row.to.avatar != null
                                ? row.to.avatar
                                : "/images/noprofile.png"
                            }
                            className="img-fluid"
                            alt="..."
                          />
                          <h5 className="mt-0">{row.to.fullname}</h5>
                        </Link>
                        {/* <p className="sl-name">EuroKids Preschool</p>
                <p>
                  <i className="fa fa-users" aria-hidden="true"></i> 21 mutual
                  friend
                </p> */}
                        <div className="connection-body">
                          <div className="followBtn">
                            <i
                              className="fa fa-thumbs-up"
                              aria-hidden="true"
                            ></i>{" "}
                            Pending
                          </div>
                          <div
                            className="followBtn-dark"
                            onClick={() =>
                              dispatch(
                                Connections({
                                  conid: row._id,
                                  auth,
                                  type: "Delete",
                                })
                              )
                            }
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                            Cancel Request
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <br />
          <div className="inn-ctn-box mt-4">
            <h2>Requests: {Request !== undefined ? Request.length : 0}</h2>
            <hr />
            <div className="row">
              {Request !== undefined
                ? Request.map((row) => (
                    <div className="col-lg-4" key={row._id}>
                      <div className="connection-box">
                        <Link to={`profile/${row.from._id}`}>
                          <img
                            src={
                              row.from.avatar != null
                                ? row.from.avatar
                                : "images/noprofile.png"
                            }
                            className="img-fluid"
                            alt="..."
                          />
                          <h5 className="mt-0">{row.from.fullname}</h5>
                        </Link>
                        {/* <p className="sl-name">EuroKids Preschool</p>
      <p>
        <i className="fa fa-users" aria-hidden="true"></i> 21 mutual
        friend
      </p> */}
                        <div className="connection-body">
                          <div
                            className="followBtn"
                            onClick={(e) =>
                              dispatch(
                                Connections({
                                  conid: row._id,
                                  auth,
                                  type: "Accept",
                                })
                              )
                            }
                          >
                            <i
                              className="fa fa-thumbs-up"
                              aria-hidden="true"
                            ></i>{" "}
                            Accept
                          </div>
                          <div
                            className="followBtn-dark"
                            onClick={() =>
                              dispatch(
                                Connections({
                                  conid: row._id,
                                  auth,
                                  type: "Delete",
                                })
                              )
                            }
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                            Remove Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          
          <div className="inn-ctn-box mt-4">
            <h2>Following: {auth.user !== undefined ? school.length : 0}</h2>
            <hr />
            <div className="row">
              {Request !== undefined
                ? school.map((row) => (
                    <div className="col-lg-4" key={row._id}>
                      <div className="connection-box">
                        <Link to={`school/${row._id}`}>
                          <img
                            src={
                              row.avatar != null
                                ? row.avatar
                                : "images/noprofile.png"
                            }
                            className="img-fluid"
                            alt="..."
                          />
                          <h5 className="mt-0">{row.fullname}</h5>
                        </Link>
{/* <p className="sl-name">EuroKids Preschool</p>
      <p>
        <i className="fa fa-users" aria-hidden="true"></i> 21 mutual
        friend
      </p> */}
                        <div className="connection-body">
                      <div
                            className="followBtn-dark"
                            onClick={() =>
                              dispatch(
                                unfollow({
                                  user:row,
                                  auth,
                                  socket
                                  
                                })
                              )
                            }
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                            Unfollow
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Connection;
