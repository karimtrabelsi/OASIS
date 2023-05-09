import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

const ResetPassword = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/password-reset`, { email: email })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        swal("Oops", "Invalid Email !", "error");
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
                    <h4 className="text-center mb-4">Reset Password</h4>
                    <form action="" onSubmit={(e) => submitHandler(e)}>
                      <div className="form-group">
                        <label>
                          <strong>E-mail</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="email"
                          name="email"
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

export default ResetPassword;
