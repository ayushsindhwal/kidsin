import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import UserCard from "./card";
import { getProfileUsers } from "../redux/actions/profile";
const Searchr = ({ match }) => {
  const [Search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    setSearch(id);
    return () => {};
  }, [id]);
  useEffect(() => {
    getDataAPI(`search?fullname=${Search}`, auth.token)
      .then((res) => setUsers(res.data.users))
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      });
    return () => {};
  }, [id, Search]);

  return (
    <>
      <div className="container">
        <div className="row bootstrap snippets bootdey">
          <div className="col-md-8 col-xs-12">
            <div className="panel" id="followers">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <i className="icon md-check" aria-hidden="true"></i>
                  {` Results for ${Search}`}
                </h3>
              </div>
              {users !== undefined
                ? users.map((x) => (
                    <Link
                      key={x._id}
                      className="name"
                      to={
                        x.role === "student"
                          ? "/profile/" + x._id
                          : "/school/" + x._id
                      }
                    >
                      <UserCard user={x} />
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

export default Searchr;
