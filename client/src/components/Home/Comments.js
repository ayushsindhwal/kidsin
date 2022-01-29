import React, { useState, useEffect } from "react";
import CommmentDisplay from "./comments/CommmentDisplay";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);

  const [next, setNext] = useState(1);

  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newRep = post.comments.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [post.comments]);
  return (
    <div>
      {showComments.map((comment, index) => (
        <CommmentDisplay
          key={index}
          comment={comment}
          post={post}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}
      {comments.length - next > 0 ? (
        <div
          className="p-2 border-top"
          style={{ cursor: "pointer", color: "#128ced", fontWeight: "bold" }}
          onClick={() => setNext(next + 10)}
        >
          see more comments...
        </div>
      ) : (
        comments.length > 2 && (
          <div
            className="p-2 border-top"
            style={{ cursor: "pointer", color: "#128ced", fontWeight: "bold" }}
            onClick={() => setNext(1)}
          >
            {" "}
            Hide Comments....
          </div>
        )
      )}
    </div>
  );
};

export default Comments;
