import {
  deleteDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";
import { DeleteData, EditData, GLOBALTYPES } from "./globalTypes";
import { createNotify } from "./notify";
import { POST_TYPE } from "./post";

export const createComment =
  (post, newComment, auth, socket, page) => async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };
    if (page == "profile") {
      dispatch({ type: POST_TYPE.UPDATE_PROFILE_POST, payload: newPost });
    } else {
      dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });
    }
    //Socket
    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postDataAPI("comment", data, auth.token);
      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });
      socket.emit("createComment", newPost);

      const msg = {
        id: res.data.newComment._id,
        text: newComment.reply
          ? "mentioned you in a comment."
          : "has commented on your post.",
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0] === 0 ? post.images[0].url : null,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updateComment =
  ({ comment, post, content, auth, page }) =>
  async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, {
      ...comment,
      content,
    });
    const newPost = { ...post, comments: newComments };
    if (page == "profile") {
      dispatch({ type: POST_TYPE.UPDATE_PROFILE_POST, payload: newPost });
    } else {
      dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });
    }
    try {
      await patchDataAPI(`comment/${comment._id}`, { content }, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likeComment =
  ({ comment, post, auth, page }) =>
  async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };
    if (page == "profile") {
      dispatch({ type: POST_TYPE.UPDATE_PROFILE_POST, payload: newPost });
    } else {
      dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });
    }
    try {
      await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikeComment =
  ({ comment, post, auth, page }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };
    if (page == "profile") {
      dispatch({ type: POST_TYPE.UPDATE_PROFILE_POST, payload: newPost });
    } else {
      dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });
    }
    try {
      await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteComment =
  ({ post, comment, auth, socket,page  }) =>
  async (dispatch) => {
    const deleteArr = [
      ...post.comments.filter((cm) => cm.reply === comment._id),
      comment,
    ];

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (cm) => !deleteArr.find((da) => cm._id === da._id)
      ),
    };
    if (page == "profile") {
      dispatch({ type: POST_TYPE.UPDATE_PROFILE_POST, payload: newPost });
    } else {
      dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });
    }
    socket.emit("deleteComment", newPost);

    try {
      deleteArr.forEach((item) => {
        deleteDataAPI(`comment/${item._id}`, auth.token);
        const msg = {
          id: item._id,
          text: comment.reply
            ? "mentioned you in a comment."
            : "has commented on your post.",
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
        };

        dispatch(createNotify({ msg, auth, socket }));
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
