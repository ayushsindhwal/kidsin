import { DeleteData, GLOBALTYPES } from "./globalTypes";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
  putDataAPI,
} from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { createNotify } from "./notify";
import axios from "axios";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  ADD_INTEREST: "ADD_INTEREST",
  DELETE_INTEREST:"DELETE_INTEREST",
  DETAILS: "DETAILS",
};

const getDetails = async (auth) => {
  const res = await getDataAPI("userDetails", auth.token);
  return res.data.data;
};

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });

        const res = await getDataAPI(`/user/${id}`, auth.token);

        dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data.data });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const userProfileUpdate =
  ({ avatar, values, auth }) =>
  async (dispatch) => {
    try {
      
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (avatar) {
        media = await imageUpload([avatar],auth);
        const res = await patchDataAPI(
          "user",
          { avatar: avatar ? media[0].url : auth.user.avatar },
          auth.token
        );
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            user: {
              ...auth.user,
              avatar: avatar ? media[0].url : auth.user.avatar,
            },
          },
        });

        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      } else {
        const res = await patchDataAPI("user", values, auth.token);
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            user: {
            
            ...res.data.user  ,
              avatar: auth.user.avatar,
            },
          },
        });
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updateUserMain =
  ({
    about,
    education,
    achievements,
    achfile,
    aid,
    skills,
    eduid,
    certificated,
    certfile,
    cid,
    info,
    auth,
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (about) {
        const res = await patchDataAPI("about", about, auth.token);
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            user: {
              ...auth.user,
              about: about ? about.about : auth.user.about,
            },
          },
        });

        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      }

      //updating and adding educaiton
      else if (education) {
        if (education.user !== undefined) {
          const res = await patchDataAPI(
            "update-education",
            education,
            auth.token
          );

          const detail = { ...auth.details, education: res.data.data };
          dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
              ...auth,
              details: detail,
            },
          });
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.msg },
          });
        } else {
          const res = await postDataAPI("add-education", education, auth.token);

          const detail = { ...auth.details, education: res.data.data };

          dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
              ...auth,
              details: detail,
            },
          });
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.msg },
          });
        }
      }

      //deleting education
      else if (eduid) {
        const res = await deleteDataAPI("delete-education", auth.token, eduid);
        const detail = { ...auth.details, education: res.data.data };
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            details: detail,
          },
        });
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      } else if (skills) {
        const res = await postDataAPI("update-skills", skills, auth.token);
        
        const detail = { ...auth.details, skill: res.data.data };

        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            details: detail,
          },
        });

        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      }

      //updating and adding certificate
      else if (certificated) {
        if (certificated.user !== undefined) {
          let sendmedia
          if(typeof(certfile)=='string')
          {
              sendmedia=certfile
          }
          else{
            let media;
            media = await imageUpload([certfile],auth);
            sendmedia=media[0].url 
          }
          
          let certification = { ...certificated, file:sendmedia };
          const res = await patchDataAPI(
            "update-certificate",
            certification,
            auth.token
          );
          const detail = { ...auth.details, certification: res.data.data };

          dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
              ...auth,
              details: detail,
            },
          });
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.msg },
          });
        } else if (certificated.user === undefined) {
          let media = await imageUpload([certfile],auth);
          let certification = { ...certificated, file: media[0].url };
          const res = await postDataAPI(
            "add-certificate",
            certification,
            auth.token
          );
          const detail = { ...auth.details, certification: res.data.data };
          dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
              ...auth,
              details: detail,
            },
          });
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.msg },
          });
        }
      }

      //deleting education
      else if (cid) {
        const res = await deleteDataAPI("delete-certificate", auth.token, cid);
        const detail = { ...auth.details, certification: res.data.data };

        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            details: detail,
          },
        });
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      } else if (info) {
        const res = await patchDataAPI("schoolinfo", { info }, auth.token);

        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            user: res.data.data,
          },
        });
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      }

      //updating and adding achievements
      else if (achievements) {
        if (achievements.user !== undefined) {
          let media;
          media = await imageUpload([achfile],auth);
          let achievement = { ...achievements, file: media[0].url };
          const res = await patchDataAPI(
            "update-achievement",
            achievement,
            auth.token
          );
          const details = { ...auth.details, Achievement: res.data.data };

          dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
              ...auth,
              details: details,
            },
          });
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.msg },
          });
        } else if (achievements.user === undefined) {
          let media = await imageUpload([achfile],auth);
          let achievement = { ...achievements, file: media[0].url };
          const res = await postDataAPI(
            "add-achievement",
            achievement,
            auth.token
          );
          const details = { ...auth.details, Achievement: res.data.data };
          dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
              ...auth,
              details: details,
            },
          });
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.msg },
          });
        }
      }

      //deleting achievements
      else if (aid) {
        const res = await deleteDataAPI("delete-achievement", auth.token, aid);
        const details = { ...auth.details, Achievement: res.data.data };

        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            details: details,
          },
        });
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const Connections =
  ({ userId, friendId, auth, conid, type }) =>
  async (dispatch) => {
    try {
      switch (type) {
        case "Send":
          {
            const res = await postDataAPI(
              "sendrequest",
              { userId, friendId },
              auth.token
            );
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            const detail = {
              ...auth.details.allconnections,
              pending: res.data.data,
            };

            dispatch({
              type: GLOBALTYPES.AUTH,
              payload: {
                ...auth,
                details: { ...auth.details, allconnections: detail },
              },
            });

            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: { success: res.data.msg },
            });
          }
          break;
        case "Accept":
          {
            const res = await postDataAPI(
              "acceptrequest",
              { conid },
              auth.token
            );
            const detail = {
              ...auth.details.allconnections,
              request: res.data.request,
            };
            dispatch({
              type: GLOBALTYPES.AUTH,
              payload: {
                ...auth,
                user:res.data.data,
                details: { ...auth.details, allconnections: detail },
              },
            });
            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: { success: res.data.msg },
            });
          }
          break;

        case "Delete":
          {
            const res = await deleteDataAPI("deleterequest", auth.token, conid);
            const detail = {
              ...auth.details.allconnections,
              pending: res.data.pending,
              request:res.data.request
            };
            
            dispatch({
              type: GLOBALTYPES.AUTH,
              payload: {
                ...auth,
                details: { ...auth.details, allconnections: detail },
              },
            });
            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: { success: res.data.msg },
            });
          }
          break;

          case "DeleteFriend":
            {
              const res=await deleteDataAPI("deleteFriend",auth.token,conid)
              
              dispatch({type:GLOBALTYPES.AUTH,payload:{
                ...auth,
                user:res.data.data
              }})
              dispatch({
                type:GLOBALTYPES.ALERT,
                payload:{
                  success:res.data.msg
                }
              })
            }
            break;
        default:
          break;
          
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const school =
  ({ event, eventfile, course, coursefile, courseid, auth, eid }) =>
  async (dispatch) => {
    //updating and adding events
    if (event) {
      if (event.id !== undefined && eid === undefined) {

        let mediasend;
        
if(typeof(eventfile)==='string')
{
  mediasend=eventfile
}
else{
  let media
  media = await imageUpload([eventfile],auth);
  mediasend=media[0].url 
}
        let evented = { ...event, file:mediasend};
        const res = await patchDataAPI("update-event", evented, auth.token);
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            details:{...auth.details,events:res.data.data}
          },
        });
    
      } 
    else if (event.id === undefined) {
        let media = await imageUpload([eventfile],auth);
        let evented = { ...event, file: media[0].url };
        const res = await postDataAPI("add-event", evented, auth.token);
        
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            details:{...auth.details,events:res.data.data},
          },
        });
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      }
    }

    //deleting events
    else if (eid) {
      const res = await deleteDataAPI("delete-event", auth.token, eid);

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          details:{...auth.details,events:res.data.data},
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } else if (course) {
      if (course.id !== undefined && course) {
        let mediasend;
        
        if(typeof(coursefile)==='string')
        {
          mediasend=coursefile
        }
        else{
          let media
          media = await imageUpload([coursefile],auth);
          mediasend=media[0].url 
        }

        let coursed = { ...course, file: mediasend };
        const res = await patchDataAPI("update-course", coursed, auth.token);

        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            details:{...auth.details,courses:res.data.data},
          },
        });
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      } else if (course.id === undefined) {
        let media = await imageUpload([coursefile],auth);
        let coursed = { ...course, file: media[0].url };
        const res = await postDataAPI("add-course", coursed, auth.token);

        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            details:{...auth.details,courses:res.data.data},
          },
        });
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: res.data.msg },
        });
      }
    } else if (courseid) {
      const res = await deleteDataAPI("delete-course", auth.token, courseid);

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          details:{...auth.details,courses:res.data.data},
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    }
  };

export const follow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser = { ...user, followers: [...user.followers, auth.user] };

    dispatch({
      type: PROFILE_TYPES.FOLLOW,
      payload: newUser,
    });
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    try {
      const res = await patchDataAPI(
        `user/${user._id}/follow`,
        null,
        auth.token
      );
      socket.emit("follow", newUser);
      const msg = {
        id: auth.user._id,
        text: "has started to follow you",
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unfollow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser = {
      ...user,
      followers: DeleteData(user.followers, auth.user._id),
    };
    dispatch({
      type: PROFILE_TYPES.UNFOLLOW,
      payload: newUser,
    });
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser._id),
        },
      },
    });
    socket.emit("unfollow", newUser);
    const msg = {
      id: auth.user._id,
      text: "has unfollowed you",
      recipients: [newUser._id],
      url: `/profile/${auth.user._id}`,
    };

    dispatch(createNotify({ msg, auth, socket }));

    try {
      await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const addInterest =
  ({ interestId, auth }) =>
  async (dispatch) => {
    try {
      if (interestId) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataAPI(
          "addinterest",
          { interestId },
          auth.token
        );
          
        const user={...auth.user,interest:res.data.data}

        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,

            user: user
          },
        });
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { success: "interest added successfully" },
        });
      } else {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: "select an interest" },
        });
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
export const deleteInterest=({interestId,auth})=>async(dispatch)=>{
  
  try {
      const res=await patchDataAPI('deleteinterest',{ interestId },auth.token)
      
      const user={...auth.user,interest:res.data.interest}
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,

          user: user,
        },
      });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: "interest removed successfully" },
      });

  } catch (error) {
    
  }
};
export const enrollCourse =
  ({ courseId, auth, profile }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI("enroll-course", { courseId }, auth.token);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, details: { ...auth.details, user: res.data.data } },
      });
      dispatch({
        type: PROFILE_TYPES.DETAILS,
        payload: { ...profile.details, courses: res.data.courses },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const joinEvent =
  ({ eventId, auth, profile }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI("join-event", { eventId }, auth.token);
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, details: { ...auth.details, user: res.data.data } },
      });
      dispatch({
        type: PROFILE_TYPES.DETAILS,
        payload: { ...profile.details, events: res.data.events },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteSkill =
  ({ skillId, auth }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI("delete-skills", auth.token, skillId);

      const detail = { ...auth.details, skill: res.data.data };
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: { ...auth, details: detail },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const endrosedSkill =
  ({ skillId, auth }) =>
  async (dispatch) => {
    try {
      const res = await patchDataAPI(
        "endrosed-skills",
        { skillId },
        auth.token
      );
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const resetLoginPassword =({ password, oldpassword, auth }) =>async (dispatch) => {
    try {
      const res=await postDataAPI('changePassword',{password,oldpassword},auth.token)
      
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

    } catch (err) {}
  };


  export const createAds=({formData,value,radius,auth})=>async(dispatch)=>{
    
    const res=await axios.post(`/admin/ads/${value.label}/${radius}`,formData, {
      headers: { Authorization: auth.token },
    })

    
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

}


export const createPage=({page,auth})=>async(dispatch)=>{
  try{
    let media;
    
    media = await imageUpload([page.image],auth);
    
    let pagesend = { ...page, image: media[0].url };
    const res=await postDataAPI('/createpage',pagesend,auth.token)
    
    const pages=auth.details.pages
    pages.push(res.data)
    const details={...auth.details,pages:pages}
    dispatch({type:GLOBALTYPES.AUTH,payload:{...auth,details:details}})
    dispatch({type:GLOBALTYPES.ALERT,payload:"page created"})

  }
  catch(err)
  {
    
  }
  

}
export const editPage=({page,auth})=>async(dispatch)=>{
  
  try{
    let media;
    
    if((typeof(page.image)!=='string') &&( page.image!=undefined))
    {
      let hello = await imageUpload([page.image],auth);
      media=hello[0].url
    }
    else{
      media=page.image
    }
    
    let pagesend = { ...page, image:media};
    const res=await putDataAPI('/editpage',pagesend,auth.token)
    
    const pages=auth.details.pages.filter(page=>page._id!==res.data._id)
    pages.push(res.data)
    const details={...auth.details,pages:res.data}
    
    dispatch({type:GLOBALTYPES.AUTH,payload:{...auth,details:details}})
    dispatch({type:GLOBALTYPES.ALERT,payload:"page updated"})

  }
  catch(err)
  {
    
  }

}
export const deletePage=({pageid,auth})=>async(dispatch)=>{
  
    const res=await deleteDataAPI(`/page/${pageid}`,auth.token)
    
    const pages=auth.details.pages.filter(page=>page._id!==res.data.id)
    const details={...auth.details,pages:pages}
    dispatch({type:GLOBALTYPES.AUTH,payload:{...auth,details:details}})
    dispatch({type:GLOBALTYPES.ALERT,payload:"page deleted"})

    

}




