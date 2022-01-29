import React, { useState } from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { createPost } from "../../redux/actions/post";
const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [file, setfile] = useState();
  const [desc, setdesc] = useState("");
  const [title, settitle] = useState("");
  const handleChangeImages = (e) => {
    setfile(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ title, desc, file, auth }));
  };

  return (
    <div className="inn-ctn-box mt-4">
      <button
        type="button"
        className="btn btn-primary postBtn"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Start a
        post
      </button>
      <button
        type="button"
        className="btn btn-primary postBtn2"
        data-toggle="modal"
        data-target="#exampleModal2"
      >
        Post Image
      </button>
      <button
        type="button"
        className="btn btn-primary postBtn2"
        data-toggle="modal"
        data-target="#exampleModal3"
      >
        Post Video
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Creat A Post
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">
                    Post Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="message-text" className="col-form-label">
                    What do you want to talk about?
                  </label>
                  <textarea
                    className="form-control"
                    name="desc"
                    id="message-text"
                    onChange={(e) => setdesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">
                    Upload Image:
                  </label>
                  <br />
                  <input
                    type="file"
                    name="fileToUpload"
                    id="fileToUpload"
                    onChange={handleChangeImages}
                  />
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
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Post Image
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">
                    Upload Image:
                  </label>
                  <br />
                  <input type="file" name="fileToUpload" id="fileToUpload" />
                </div>
                <div className="form-group">
                  <label for="message-text" className="col-form-label">
                    Image Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="postBtn" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="postBtn2">
                Post Image
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Post Video
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">
                    Upload Video:
                  </label>
                  <input type="file" name="fileToUpload" id="fileToUpload" />
                </div>
                <div className="form-group">
                  <p>or</p>
                  <label for="recipient-name" className="col-form-label">
                    Enter URL:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="form-group">
                  <label for="message-text" className="col-form-label">
                    Video Description:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="postBtn" data-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="postBtn2">
                Post Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
