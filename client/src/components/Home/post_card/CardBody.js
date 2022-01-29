import React, { useState } from "react";
import Carousel from "../../Carousel";

const CardBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <div className="stpost-ctn">
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + " "
            : post.content.slice(0, 60) + "..."}
        </span>
        {post.content.length > 60 && (
          <span
            className="readMore text-primary"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "Hide content" : "Read more "}
          </span>
        )}
      </div>
      <div className="stpost-img">
        {post.images.length > 0 && (
          <Carousel images={post.images} ads={post.ads.length>0?true:false} id={post._id} />
        )}
      </div>
    </>
  );
};

export default CardBody;
