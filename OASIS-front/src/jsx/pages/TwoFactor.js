import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import swalMessage from "@sweetalert/with-react";

const TwoFactor = () => {
   const [lockScreenData, setLockScreenData] = useState({});
   const handleBlur = (e) => {
      const newLockScreenData = { ...lockScreenData };
      newLockScreenData[e.target.name] = e.target.value;
      setLockScreenData(newLockScreenData);
   };
   const submitHandler = (e) => {
      e.preventDefault();
      const unlock = { ...lockScreenData };
   };

   const [user, setUser] = useState([]);
  useEffect(( ) => {
  }, []);


  //const form = e.target;
  //const code = form.elements.codeOTP.value;

  const verifyOTP = (phonenumber) => {
    axios.post("http://localhost:3000/users/twoFactorAuth/verify/" + user.phonenumber ).catch((err) => {
      console.log(err);
    });
  };
  


   return (
      <div className="authincation">
         <div className="container p-0">
            <div className="row justify-content-center align-items-center authincation-page-area">
               <div className="col-lg-6 col-md-9">
                  <div className="authincation-content">
                     <div className="row no-gutters">
                        <div className="col-xl-12">
                           <div className="auth-form">
                              <h4 className="text-center mb-4">
                                 Authenticate with Two Factor
                              </h4>
                              <form
                                 action=""
                                 onSubmit={(e) =>
                                    e.preventDefault(submitHandler)
                                 }
                              >
                                 <div className="form-group">
                                    <label>
                                       <strong>Security Code :</strong>
                                    </label>
                                    <input
                                       type="text"
                                       className="form-control"
                                       name="codeOTP"
                                       onChange={handleBlur}
                                    />
                                 </div>
                                 <div className="text-center">
                                    <button
                                       type="submit"
                                       className="btn btn-primary btn-block"
                                       onClick={() => verifyOTP(user.phonenumber)}
                                    >
                                       Send
                                    </button>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TwoFactor;
