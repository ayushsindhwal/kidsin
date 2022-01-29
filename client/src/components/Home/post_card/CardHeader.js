import React from "react";
import Avatar from "../../Avatar";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/post";
import { unfollow } from "../../../redux/actions/profile";
import { patchDataAPI, postDataAPI } from "../../../utils/fetchData";
const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };
  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?"))
      dispatch(deletePost({ post, auth, socket }));
    return history.push("/");
  };

  const stopcomment = async(id) => {
    const res=await patchDataAPI(`/post/${id}`,{stopcomment:post.stopcomment===false?true:false},auth.token)
  };


  return (
    <div className="media">
      <Link
        to={
          post.ads.length===0?(post.user.role === "student"
            ? `/profile/${post.user._id}`
            : `/school/${post.user._id}`):null
        }
      >
       {post.ads.length>0?null: <Avatar src={post.user.hideprofile===true?null:post.user.avatar} />}
       </Link>

      <div className="media-body">
      <Link
        to={
          post.ads.length===0?(post.user.role === "student"
            ? `/profile/${post.user._id}`
            : `/school/${post.user._id}`):null
        }
      >
        <h5 className="mt-0">{post.ads.length>0?"Advertisement":post.user.fullname}</h5>
        </Link>

   
        <h5 class="mt-0">{post.user.schoolname}</h5>

        <p className="pstTime">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
          {moment(post.createdAt).fromNow()}
        </p>
        <div className="std-head-right">
          <div className="dropdown">
            <button
              className="dropdown-toggle ustBtn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-align-justify" aria-hidden="true"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {auth.user._id === post.user._id ? (
                <>
                  <button className="dropdown-item" onClick={handleEditPost}>
                    <i className="fa fa-bookmark-o" aria-hidden="true"></i> edit
                  </button>
                  <button className="dropdown-item" onClick={handleDeletePost}>
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>{" "}
                    delete
                    
                  </button>
                  {post.stopcomment===false?<button className="dropdown-item" onClick={()=>stopcomment(post._id)}>
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>{" "}
                    stop comment
                  </button>:<button className="dropdown-item" onClick={()=>stopcomment(post._id)}>
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>{" "}
                    enable comment
                  </button>}
                </>
              ) : (
                
                  post.user.followers.filter(user=>user._id===auth.user._id).length>0?
                <button className="dropdown-item">
                <i className="fa fa-times" aria-hidden="true" onClick={e=>dispatch(unfollow({user:post.user,auth,socket}))}>unfollow</i>
                </button>
                :  <button className="dropdown-item">
                <i className="fa fa-times" aria-hidden="true" onClick={e=>dispatch(unfollow({user:post.user,auth,socket}))}>{"  "}report</i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
