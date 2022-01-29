import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PostCard from "../PostCard";
const Posts = ({ posted, st }) => {
  const { homePosts } = useSelector((state) => state);

  const [Homeposts, setHomeposts] = useState(homePosts);
useEffect(() => {
  setHomeposts(homePosts)
  return () => {
    
  };
}, [homePosts]);
  return (
    <div style={{ display: `${st}` }} className="schoolpublicpost">
      {(posted != undefined ? posted : Homeposts.posts).map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
