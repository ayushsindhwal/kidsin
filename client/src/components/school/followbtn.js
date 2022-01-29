import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/actions/profile";

const Followbtn = ({ user }) => {
  const [followed, setfollowed] = useState(false);
  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setfollowed(true);
    }
  }, [auth.user.following, user._id]);

  const handleFollow = () => {
    setfollowed(true);
    dispatch(follow({ users: profile.users, user, auth, socket }));
  };
  const handleUnFollow = () => {
    setfollowed(false);
    dispatch(unfollow({ users: profile.users, user, auth, socket }));
  };

  return (
    <>
      {followed ? (
        <button className="followBtn" onClick={handleUnFollow}>
          UnFollow
        </button>
      ) : (
        <button className="followBtn" onClick={handleFollow}>
          Follow
        </button>
      )}
    </>
  );
};

export default Followbtn;
