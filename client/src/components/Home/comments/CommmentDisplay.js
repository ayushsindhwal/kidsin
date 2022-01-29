import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

const CommmentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(2);
  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);
  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="pl-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  comment={item}
                  key={index}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}
          {replyCm.length - next > 0 ? (
            <div
              className="p-2 border-top"
              style={{
                cursor: "pointer",
                color: "#128ced",
                fontWeight: "bold",
              }}
              onClick={() => setNext(next + 10)}
            >
              see more reply...
            </div>
          ) : (
            replyCm.length > 2 && (
              <div
                className="p-2 border-top"
                style={{
                  cursor: "pointer",
                  color: "#128ced",
                  fontWeight: "bold",
                }}
                onClick={() => setNext(2)}
              >
                {" "}
                Hide reply....
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommmentDisplay;
