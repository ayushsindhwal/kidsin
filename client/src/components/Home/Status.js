import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
const Status = ({pageid,role}) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  

  const postonly=()=>{
    dispatch({ type: GLOBALTYPES.STATUS, payload: true });
    dispatch({type:GLOBALTYPES.PAGEID,payload:pageid})
  }
  return (
    // three buttons for posting starting from student
  role==='student'?
      <button
        type="button"
        onClick={() =>postonly()}
        className="btn btn-primary postBtn"
        data-toggle="modal"
        data-target="#exampleModal"
        style={{margin:'2vw 0 0 20vw'}}
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Start a
        post
      </button>
    
    :
    <div className="status my-3 d-flex">
      <button
        type="button"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        className="btn btn-primary postBtn"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Start a
        post
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        className="btn btn-primary postBtn2"
        data-toggle="modal"
        data-target="#exampleModal2"
      >
        Post Image
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        className="btn btn-primary postBtn2"
        data-toggle="modal"
        data-target="#exampleModal3"
      >
        Post Video
      </button>
    </div>
    
  );
};

export default Status;
