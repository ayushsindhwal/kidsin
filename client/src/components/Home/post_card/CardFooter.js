import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { likePost, unlikePost } from "../../../redux/actions/post";
import LikeButton from "../../likebutton";
import { useSelector, useDispatch } from "react-redux";
import ShareModal from "../../ShareModal";

const CardFooter = ({ post, showCommentbox, setShowCommentbox }) => {
  const { auth, homePosts, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const handleLike = () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);

    dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);

    dispatch(unlikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [post.likes, auth.user._id]);

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div className="footerbox">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
{post.stopcomment===false?
<>
          <button
            type="button"
            onClick={() => setShowCommentbox(!showCommentbox)}
            className="btn btn-primary postBtn2 mt-0 commentbtn"
            data-toggle="modal"
            data-target="#exampleModal5"
          >
             Comment
          </button>
          <i             onClick={() => setShowCommentbox(!showCommentbox)}
 className="fas fa-comments commenticon" style={{display:'none'}}></i>

          </>:null
}
          <button
            type="button"
            onClick={() => setIsShare(!isShare)}
            className="btn btn-primary postBtn2 mt-0 commentbtn"
            data-toggle="modal"
            data-target="#exampleModal5"
          >
            Share
          </button>
          <i className="fa fa-share commenticon"   style={{display:'none'}}           onClick={() => setIsShare(!isShare)}
 aria-hidden="true"></i>
        </div>
        <div className="d-flex justify-content-between ">
          <h6 style={{ padding: "0 30px", cursor: "pointer" }}>
            {post.likes.length} Likes
          </h6>

         {post.stopcomment===false? <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
            {post.comments.length} Comments
          </h6>:null
        }
        </div>
      </div>
      {isShare && <ShareModal url={`https://kidsin.org/post/${post._id}`} />}
    </div>
  );
};

export default CardFooter;
