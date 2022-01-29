import React, { useState } from "react";
import CardBody from "./Home/post_card/CardBody";
import CardHeader from "./Home/post_card/CardHeader";
import CardFooter from "./Home/post_card/CardFooter";
import Comments from "./Home/Comments";
import InputComment from "./Home/InputComment";

const PostCard = ({ post }) => {
  const [showCommentbox, setShowCommentbox] = useState(true);
  return (
    <div className="inn-ctn-box mt-4 mb-5 box-pgn">
      <div className="std-head-left">
        <CardHeader post={post} />
        <CardBody post={post} />
        <hr />
        {post.ads.length>1?null:
        <>
        <CardFooter
          showCommentbox={showCommentbox}
          setShowCommentbox={setShowCommentbox}
          post={post}
        />
        <Comments post={post} />
        </>
        }
        {showCommentbox ? null : <InputComment post={post} />}
      </div>
    </div>
  );
};

export default PostCard;
