import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NewPassword = () => {
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const searchParams = new URLSearchParams(document.location.search);
    const id = searchParams.get("id");
    const token = searchParams.get("token");
    axios
      .post("http://localhost:3000/password-reset/" + id + "/" + token, {
        password: password,
      })
      .then((res) => {
        console.log(res);
        history.push("/page-login");
      })
      .catch((err) => {
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
                    <h4 className="text-center mb-4">New Password</h4>
                    <form action="" onSubmit={(e) => submitHandler(e)}>
                      <div className="form-group">
                        <label>
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="password"
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

export default NewPassword;
