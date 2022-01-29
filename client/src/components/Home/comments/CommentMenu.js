import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../redux/actions/comment";
import { postDataAPI } from "../../../utils/fetchData";
const CommentMenu = ({ post, comment, setOnEdit }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment, socket }));
    }
  };

  const MenuItem = () => {
    return (
      <div>
        <div className="dropdown-item" onClick={() => setOnEdit(true)}>
          <div className="material-icons">create</div>
          Edit
        </div>
    
        <div className="dropdown-item" onClick={handleRemove}>
          <div className="material-icons">delete_outline</div>
          Remove
        </div>
        
      </div>
    );
  };
  return (
    <div className="menu">
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div className="nav-item dropdown">
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_vert
          </span>
          <div className="dropdown-menu" aria-labelledby="moreLink">
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdown-tem" onClick={handleRemove}>
                  <span className="material-icons">delete_outline</span> remove
                </div>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
