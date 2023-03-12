import axios from "axios";
import React from "react";

const TwoFactorAuth = () => { 
   const submitHandler = (e) => {
      e.preventDefault();
     const form = e.target;
     const code = form.code.value;
     const connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
     const phonenumber = connectedUser.phonenumber;
    axios.post("http://localhost:3000/verify/", {code : code,number: phonenumber} ).then((res) => {
    
      console.log(res);    
    } ).catch((err) => {
      console.log("err");
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
                              Enter Code
                              </h4>
                              <form
                                 action=""
                                 onSubmit={(e) =>
                                    submitHandler(e)
                                 }
                              >
                                 <div className="form-group">
                                    <label>
                                       <strong>Code</strong>
                                    </label>
                                    <input
                                       type="password"
                                       className="form-control"
                                       placeholder="Code"
                                       name="password"
                                       
                                    />
                                 </div>
                                 <div className="text-center">
                                    <button
                                       type="submit"
                                       className="btn btn-primary btn-block"
                                       onClick={() => submitHandler}
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

export default TwoFactorAuth;
