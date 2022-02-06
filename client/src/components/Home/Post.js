import React, { useState } from "react";
import Likebutton from "../likebutton";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../../redux/actions/post";

const Post = ({ posted, st }) => {
  const { auth, homePosts } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [post, setPost] = useState();
  const [readMore, setReadMore] = useState();

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);

     dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };
  const handleUnLike = () => {
    setIsLike(false);
  };

  return (
    <div className="posts " style={{ display: `${st}` }}>
      {(posted !== undefined ? posted : homePosts.posts).map((post) => (
        <div key={post._id} className="card my-3">
          <div className="inn-ctn-box mt-4 mb-5 box-pgn">
            <div className="std-head-left">
              <div className="media">
                {}
                <Link
                  to={
                    post.user.role === "student"
                      ? `/profile/${post.user._id}`
                      : `/school/${post.user._id}`
                  }
                >
                  <img
                    src={post.user.avatar}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    className="mr-2"
                    alt="..."
                  />
                  <div className="media-body">
                    <h5 className="mt-0">{post.user.fullname}</h5>
                    <p className="add-txt">{post.user.address}</p>
                    <p className="pstTime">
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                      {moment(post.createdAt).fromNow()}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="stpost-ctn">
                <span>
                  {post.desc.length < 60
                    ? post.desc
                    : readMore
                    ? post.desc + " "
                    : post.desc.slice(0, 60) + "..."}
                </span>
                {post.desc.length > 60 && (
                  <span
                    className="readMore text-primary"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? "Hide content" : "Read more "}
                  </span>
                )}
              </div>
              <div className="stpost-img">
                <img src={post.image[0].url} className="img-fluid" alt="..." />
                <p className="commentPrg">
                  {post.likedBy.length} Likes {post.comments.length} comments
                </p>
              </div>

              <div className="stpost-social">
                <button
                  type="button"
                  className="btn btn-primary postBtn2 mt-0"
                  onClick={(e) => {
                    setPost(post);
                  }}
                >
                  <Likebutton
                    isLike={isLike}
                    handleLike={handleLike}
                    handleUnLike={handleUnLike}
                  />
                </button>
                <button
                  type="button"
                  className="btn btn-primary postBtn mt-0"
                  data-toggle="modal"
                  data-target="#exampleModal4"
                >
                  <i className="fa fa-commenting-o" aria-hidden="true"></i>{" "}
                  Comment
                </button>
                <button
                  type="button"
                  className="btn btn-primary postBtn2 mt-0"
                  data-toggle="modal"
                  data-target="#exampleModal5"
                >
                  <i className="fa fa-share" aria-hidden="true"></i> Share
                </button>

                <div
                  className="modal fade"
                  id="exampleModal4"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Post a Comment
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group">
                            <label
                              for="message-text"
                              className="col-form-label"
                            >
                              What do you want to talk about?
                            </label>
                            <textarea
                              className="form-control"
                              id="message-text"
                            ></textarea>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary postBtn"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary postBtn2"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="exampleModal5"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Share
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>{post.desc}</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary postBtn"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary postBtn2"
                        >
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="std-head-right">
              <div className="dropdown">
                <button
                  className="dropdown-toggle ustBtn"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-align-justify" aria-hidden="true"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {post.user._id === auth.user._id ? (
                    <a className="dropdown-item" href="#">
                      <i className="fa fa-trash-o" aria-hidden="true"></i>{" "}
                      delete
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
