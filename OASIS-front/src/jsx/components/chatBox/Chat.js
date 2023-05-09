import React, { useEffect, useState } from "react";

/// Images
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import avatar4 from "../../../images/avatar/4.jpg";
import avatar5 from "../../../images/avatar/5.jpg";
import MsgBox from "./MsgBox";
import MsgBoxChat from "./MsgBoxChat";
import axios from "axios";
import { set } from "date-fns";

const Chat = ({ PerfectScrollbar, toggleChatBox, toggleTab }) => {
   const [openMsg, setOpenMsg] = useState(false);
   const [openMsgC, setOpenMsgC] = useState(false);
   const [user, setuser] = useState([]);
   const [users, setUsers] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);
   const userr = JSON.parse(localStorage.getItem("connectedUser"));


   useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/users`).then((res) => {
         setUsers(res.data);
      });
   }, []);

   return (
      <div
         className={`tab-pane fade  ${toggleTab === "chat" ? "active show" : ""
            }`}
         id="chat"
         role="tabpanel"
      >
         <div
            className={`card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box ${openMsg || openMsgC ? "d-none" : ""}`}
            
         >
            <div className="card-header chat-list-header text-center">
               <a href="#">
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
                        <rect
                           fill="#000000"
                           x="4"
                           y="11"
                           width="16"
                           height="2"
                           rx="1"
                        />
                        <rect
                           fill="#000000"
                           opacity="0.3"
                           transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) "
                           x="4"
                           y="11"
                           width="16"
                           height="2"
                           rx="1"
                        />
                     </g>
                  </svg>
               </a>
               <div>
                  <h6 className="mb-1">Chat List</h6>
                  <p className="mb-0">Show All</p>
               </div>
               <a href="#">
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
            </div>
            <PerfectScrollbar
               className={`card-body contacts_body p-0 dz-scroll  ${toggleChatBox ? "ps ps--active-y" : ""
                  }`}
               id="DZ_W_Contacts_Body"
            >
               <ul className="contacts">
                  <li
                     className="active dz-chat-user"
                     onClick={() => { setOpenMsg(true); setOpenMsgC(false);}}
                  >
                     <div className="d-flex bd-highlight">
                        <div className="img_cont">
                           <img
                              src={avatar1}
                              className="rounded-circle user_img"
                              alt=""
                           />
                           <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                           <span>ChatBot</span>
                           <p>ChatBot is online</p>
                        </div>
                     </div>
                  </li>
                  {users
                     .filter((user) => user.club == userr.club)
                     .map((user, index) => (
                        <li
                           className="active dz-chat-user"
                           onClick={() => {
                              setOpenMsgC(true);
                              setOpenMsg(false);
                              setSelectedUser(user);
                           }}
                           key={user._id}
                        >
                           <div className="d-flex bd-highlight">
                              <div className="img_cont">
                                 <img
                                    src={require("../../../images/users/" + user.image)}
                                    className="rounded-circle user_img"
                                    alt=""
                                 />
                                 <span className="online_icon"></span>
                              </div>
                              <div className="user_info">
                                 <span>{user.firstname} {user.lastname}</span>
                                 <p>{user.firstname} is online</p>
                              </div>
                           </div>
                        </li>
                     ))}
               </ul>
            </PerfectScrollbar>
         </div>
         <MsgBox
            avatar1={avatar1}
            avatar2={avatar2}
            openMsg={openMsg}
            PerfectScrollbar={PerfectScrollbar}
            offMsg={() => setOpenMsg(false)}
         />
         <MsgBoxChat
            PerfectScrollbar={PerfectScrollbar}
            openMsgC={openMsgC}
            offMsg={() => setOpenMsgC(false)}
            userSelected={selectedUser}
         />
      </div>
   );
};

export default Chat;
