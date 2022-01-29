import React, { useEffect, useState } from "react";
import UserCard from "../card";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useHistory, useParams } from "react-router-dom";
import { addUser, getConversations } from "../../redux/actions/message";
const LeftSide = () => {
  const history = useHistory();
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const { id } = useParams();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);
    try {
      const res = await getDataAPI(`search?fullname=${search}`, auth.token);
      if (res.data === undefined)
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: "no user with this name" },
        });

      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations(auth));
  }, [dispatch, auth, message.firstLoad]);
  return (
    <>
      <div className="headind_srch">
        <div className="recent_heading">
          <h4>Recent</h4>
        </div>
        <form onClick={handleSearch} className="srch_bar">
          <div className="stylish-input-group">
            <input
              type="text"
              className="search-bar"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="input-group-addon">
              <button type="submit" style={{ display: "none" }} id="search">
                search
              </button>

              <button type="button">
                {" "}
                <i className="fa fa-search" aria-hidden="true"></i>{" "}
              </button>
            </span>{" "}
          </div>
        </form>
      </div>

      <div className="inbox_chat">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                className="inbox_chat"
                key={user._id}
                className={`${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} msg={true}>
                  <i className="fas fa-circle active" />
                </UserCard>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LeftSide;
