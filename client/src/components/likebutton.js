import React from "react";
import { useSelector } from "react-redux";
const Likebutton = ({ isLike, handleLike, handleUnLike, click }) => {
  return isLike ? (
    <i className="fas fa-thumbs-up text-primary" onClick={handleUnLike}></i>
  ) : (
    <i className="far fa-thumbs-up" onClick={handleLike}></i>
  );
};

export default Likebutton;
