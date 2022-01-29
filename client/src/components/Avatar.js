import React from "react";

const Avatar = ({ src, size }) => {
  return (
    <img
      src={src}
      alt=""
      style={{
        height: size ? size : "30px",
        width: size ? size : "30px",
        marginRight:"5px",
        borderRadius: "50%",
      }}
    />
  );
};

export default Avatar;
