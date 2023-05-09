import React, { useState, useEffect } from "react";
import axios from "axios";
import { el } from "date-fns/locale";
import useAuthStore from "../../../utils/zustand";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");


const MsgBoxChat = ({ avatar1, avatar2, openMsgC, PerfectScrollbar, offMsg, userSelected, username, room }) => {
   const to = userSelected;
   const userr = JSON.parse(localStorage.getItem("connectedUser"));
   const [currentMessage, setCurrentMessage] = useState("");
   const [messageList, setMessageList] = useState([]);
   const [toggle, setToggle] = useState(false);
   const [user, setuser] = useState([]);
   const [response, setResponse] = useState([]);
   const [message, setMessage] = useState([]);
   const [newResponse, setNewResponse] = useState();
   const [newMessage, setNewMessage] = useState();
   const [chat, setChat] = useState([])
   const [isTyping, setIsTyping] = useState(false);

   const sendMessage = async () => {
      socket.emit("join_room", `${userr._id}${to._id}`);
      if (currentMessage !== "") {
         const messageData = {
            room: `${userr._id}${to._id}`,
            author: userr.firstname,
            message: currentMessage,
            time:
               new Date(Date.now()).getHours() +
               ":" +
               new Date(Date.now()).getMinutes(),
         };


         await socket.emit("send_message", messageData);
         setMessageList((list) => [...list, messageData]);
         setCurrentMessage("");
         console.log(socket)
      }
   };

   useEffect(() => {
      if (socket) {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }
    }, [socket]);



   return (
      <div
         className={`card chat dz-chat-history-box ${openMsgC ? "" : "d-none"}`}
      >
         <div className="card-header chat-list-header text-center">
            <a
               href="#"
               className="dz-chat-history-back"
               onClick={() => offMsg()}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  version="1.1"
               >
                  <g
                     stroke="none"
                     strokeWidth="1"
                     fill="none"
                     fillRule="evenodd"
                  >
                     <polygon points="0 0 24 0 24 24 0 24" />
                     <rect
                        fill="#000000"
                        opacity="0.3"
                        transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) "
                        x="14"
                        y="7"
                        width="2"
                        height="10"
                        rx="1"
                     />
                     <path
                        d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z"
                        fill="#000000"
                        fillRule="nonzero"
                        transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "
                     />
                  </g>
               </svg>
            </a>
            <div>
               {userSelected !== null ? (
                  <>
                     <h6 className="mb-1">Chat with {to.firstname}</h6>
                     <p className="mb-0 text-success">Online</p>
                  </>
               ) : (
                  <p>Please select a user to chat with</p>
               )}
            </div>
            <div className="dropdown">
               <a
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setToggle(!toggle)}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink"
                     width="18px"
                     height="18px"
                     viewBox="0 0 24 24"
                     version="1.1"
                  >
                     <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                     >
                        <rect x="0" y="0" width="24" height="24" />
                        <circle fill="#000000" cx="5" cy="12" r="2" />
                        <circle fill="#000000" cx="12" cy="12" r="2" />
                        <circle fill="#000000" cx="19" cy="12" r="2" />
                     </g>
                  </svg>
               </a>
               <ul
                  className={`dropdown-menu dropdown-menu-right ${toggle ? "show" : ""
                     }`}
               >
                  <li
                     className="dropdown-item"
                     onClick={() => setToggle(false)}
                  >
                     <i className="fa fa-user-circle text-primary mr-2"></i>{" "}
                     View profile
                  </li>
                  <li
                     className="dropdown-item"
                     onClick={() => setToggle(false)}
                  >
                     <i className="fa fa-users text-primary mr-2"></i> Add to
                     close friends
                  </li>
                  <li
                     className="dropdown-item"
                     onClick={() => setToggle(false)}
                  >
                     <i className="fa fa-plus text-primary mr-2"></i> Add to
                     group
                  </li>
                  <li
                     className="dropdown-item"
                     onClick={() => setToggle(false)}
                  >
                     <i className="fa fa-ban text-primary mr-2"></i> Block
                  </li>
               </ul>
            </div>
         </div>
         <PerfectScrollbar
            className={`card-body msg_card_body dz-scroll ${openMsgC ? "ps ps--active-y" : ""
               } `}
            id="DZ_W_Contacts_Body3"
         >
            {messageList.map((messageContent,index) => {
               <div key={index}>
                  <div className="d-flex justify-content-end mb-4">
                     <div className="msg_cotainer_send">
                        {messageContent.message}

                        <span className="msg_time_send"><p id="time">{messageContent.time}</p>
                           <p id="author">{messageContent.author}</p></span>
                     </div>
                     <div className="img_cont_msg">
                        <img
                           src={require("../../../images/users/" + userr.image)}
                           className="rounded-circle user_img_msg"
                           alt=""
                        />
                     </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                     <div className="img_cont_msg">
                        <img
                           src={avatar1}
                           className="rounded-circle user_img_msg"
                           alt=""
                        />
                     </div>
                     <div className="msg_cotainer">
                        {messageContent.message}
                        
                        <span className="msg_time"><p id="time">{messageContent.time}</p>
                           <p id="author">{messageContent.author}</p></span>
                     </div>
                  </div>
               </div>
            })}

         </PerfectScrollbar>
         <div className="chat-footer">
            <input
               type="text"
               value={currentMessage}
               placeholder="Hey..."
               onChange={(event) => {
                  setCurrentMessage(event.target.value);
               }}
               onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
               }}
            />
            <button onClick={sendMessage}>&#9658;</button>
         </div>
      </div >
   );
};

export default MsgBoxChat;
