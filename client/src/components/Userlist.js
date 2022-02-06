import React, { useEffect, useState } from "react";
import "./usersStyle.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker } from '@react-pdf-viewer/core'




Modal.setAppElement("#root");

const Userlist = () => {
  const { userlist } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState();
  const [userData, setuserData] = useState('');
  const [ext, setext] = useState('');

  useEffect(() => {
    
    setisOpen(userlist.show);
    setuserData(userlist.userdata);
    
    setext(getFileExtension(userlist.userdata))

    return () => {
      
    };
  }, [userlist]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  function getFileExtension(filename){
    
    // get file extension
    if(filename===undefined||typeof(filename)==='object')
    {
      return null
    }
    else{
      
      const b= filename.split('.').pop();
      
      return b
  
    }
   
}

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      // onRequestClose={closeModal}
      className={userlist.image===true&&ext!=='pdf'?"modalonly":''}
      contentLabel="Example Modal"
    >
      <span
        onClick={() =>
          dispatch({
            type: GLOBALTYPES.USERLIST,
            payload: { show: false, userdata: [],image:false },
          })
        }
        style={{
          position: "fixed",
          right: "0px",
          top: "0px",
          fontSize: "2em",
          cursor: "pointer",
        }}
      >
        &times;
      </span>
      {/* <div className="drop">
        <div className="drop__container" id="drop-items">
          {userData.map((user) => (
            <div className="drop__card">
              <div className="drop__data">
                <img src={user.avatar} alt="" className="drop__img" />
                <div>
                  <h1 className="drop__name">{user.fullname}</h1>
                  <span className="drop__profession">{user.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
{userlist.image==true?(ext==='pdf'?
<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
<Viewer
    fileUrl={userData!=undefined?userData:null}
    plugins={[
        defaultLayoutPluginInstance,
    ]}
/>

</Worker>

:<img src={userData!=undefined?userData:null}/>):
(
<div className="container bootstrap snippets bootdey" >
    <div className="row">
        <div className="col-lg-12">
            <div className="main-box no-header clearfix">
                <div className="main-box-body clearfix">
                    <div className="table-responsive">
                        <table className="table user-list">
                            <thead>
                                <tr>
                                <th><span>User</span></th>
                                <th><span>Email</span></th>
                                <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                            {typeof(userData)=='string'?null:userData.map((user) => (
                                <tr>
                                    <td>
                                        <img src={user.avatar} alt="" />
                                        <a href="#" className="user-link">{user.fullname}</a>
                                    </td>
                             
                                    <td>
                                        <a href="#">{user.email}</a>
                                    </td>
                             
                                </tr>
                            ))}
            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>)}
    </Modal>
  );
};

export default Userlist;
