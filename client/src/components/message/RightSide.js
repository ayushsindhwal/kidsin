import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import {
  addMessage,
  getMessages,
  MESS_TYPES,
} from "../../redux/actions/message";
import axios from "axios";

const RightSide = () => {
  const { auth, message, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [Allmessage, setAllmessage] = useState([]);
  useEffect(() => {
    getAllmessages()
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) {
      setUser(newUser);
    
    }
  }, [message.users, id]);


  const getAllmessages=async()=>{
    const hello=await axios.get('/api/getallmessage',{
      headers: { Authorization:auth.token}
    })
    console.log(hello.data)
    setAllmessage(hello.data)
    setText(hello.data[0].text)
  }

  const handleSubmit = (e) => {
    console.log(text)
    e.preventDefault();
    if (!text.trim()) return;
    setText("");
    let newArr = [];
    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };
    dispatch(addMessage({ msg, auth, socket }));
  };

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: { messages: [] } });
        await dispatch(getMessages({ auth, id }));
      };
      getMessagesData();
    }
  }, [id, dispatch, auth]);
  return (
    <>
      <div
        className="chat_container"
        style={{ height: "600px", overflowY: "auto" }}
      >
        <div className="chat_display">
          {message.data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <MsgDisplay user={user} msg={msg} />
                </div>
              )}

              {msg.sender === auth.user._id && (
                <div className="chat_row your_message">
                  <MsgDisplay user={auth.user} msg={msg} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <form className="chat_input">
       { auth.user.role=='student'?<select
          onChange={(e) => setText(e.target.value)}
          value={text}
          style={{ width: "100%" }}
        >
          {
            Allmessage.map(message=><option  value={message.text}>{message.text}</option>)
          }
        </select>:
        <input onChange={(e) => setText(e.target.value)} value={text}  style={{ width: "100%" }}/>
}
        <button
          onClick={handleSubmit}
          type="submit"
          className="material-icons"
          disable={text ? false : true}
        >
          near_me
        </button>
      </form>
    </>
  );
};

export default RightSide;
