import React from "react";

import PostCard from "./PostCard";
const Posts = ({ posted, st }) => {
  return (
    <div style={{ display: `${st}` }}>
      {posted !== undefined
        ? posted.map((post) => <PostCard key={post._id} post={post} />)
        : null}
    </div>
  );
};

export default Posts;
