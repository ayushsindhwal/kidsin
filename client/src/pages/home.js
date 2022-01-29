import React,{useState} from "react";
import Status from "../components/Home/Status";
import Post from "../components/Home/Posts";
import LoadingIcon from "../images/loader.gif";
import { useDispatch, useSelector } from "react-redux";
import SidebarStudentRight from "../components/SidebarStudentRight";
import { Dropdown } from "semantic-ui-react";
import { createPost } from "../redux/actions/post";




const Home = () => {
  const { auth, homePosts } = useSelector((state) => state);

  return (
    <>
      <div className="row">
        <div className="col-lg-8">
        
        <Status role={auth.user.role}/>
          {homePosts.loading ? (
            <img src={LoadingIcon} alt="Loading" className="d-block mx-auto" />
          ) : homePosts.result === 0 ? (
            <h2 className="text-center">No Posts</h2>
          ) : (
            <Post />
          )}
        </div>
        <SidebarStudentRight />
      </div>
    </>
  );
};

export default Home;
