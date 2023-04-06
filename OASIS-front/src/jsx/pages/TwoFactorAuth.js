import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const TwoFactorAuth = () => {
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const code = form.code.value;
    const phonenumber = JSON.parse(localStorage.getItem("number"));
    axios
      .post("http://localhost:3000/users/twoFactorAuth/verify", {
        code: code,
        number: phonenumber,
      })
      .then((res) => {
        if (res.data === "Code is not correct") {
          swal("Oops", "Code is not correct !", "error");
        } else {
          console.log(res);
          const user = localStorage.getItem("userLogginIn");
          console.log(JSON.parse(user));
          axios
            .post("http://localhost:3000/login", JSON.parse(user))
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("connectedUser", res.data.user);

              history.push("/");
            });
        }
      })
      .catch((err) => {
        console.log(phonenumber);
        console.log(code);
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
                    <h4 className="text-center mb-4">Enter Code</h4>
                    <form action="" onSubmit={(e) => submitHandler(e)}>
                      <div className="form-group">
                        <label>
                          <strong>Code</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Code"
                          name="code"
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
