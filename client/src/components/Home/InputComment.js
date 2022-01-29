import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/comment";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };
    dispatch(createComment(post, newComment, auth, socket));
    if (setOnReply) return setOnReply(false);

    setContent("");
  };
  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder="Add your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="postBtn">
        Post
      </button>
    </form>
  );
};

export default InputComment;
