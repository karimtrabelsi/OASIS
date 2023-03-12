import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import logo from "../../images/logo.png";
import swal from "sweetalert";

const Login = () => {
  const history = useHistory();
  const [ip, setIP] = useState("");

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };
  function handleLogin(e) {
    e.preventDefault();
    getData();
    const form = e.target;
    const user = {
      username: form.username.value,
      password: form.password.value,
      ip: ip,
    };

    console.log(user);
    axios
      .post("http://localhost:3000/login", user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("connectedUser", res.data.user);

        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data ===
          "User is not approved,please wait for an admin to approve your account"
        ) {
          swal("Oops", "Your account is not approved yet!", "error");
        } else if (err.response.data === "User is banned") {
          swal("Oops", "Your account is banned !", "error");
        } else if (
          err.response.data.msg === "User is not allowed to login from this IP"
        ) {
          console.log(err.response.data.number);
          // let number = err.respone.data.number;
          console.log("sssssss");
          console.log(err.response.data);
          axios
            .post("http://localhost:3000/users/twoFactorAuth/send", {
              number: err.response.data.number,
            })
            .then((res) => {
              swal(
                "Please verify yourself",
                "Weve sent you an sms to the number : " +
                  err.response.data.number,
                "error"
              );
              localStorage.setItem("number", err.response.data.number);
              history.push("/page-twofactor-auth");
            });
        }
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/getUsername", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) =>
        res.data.isLoggedIn
          ? history.push("/dashboard")
          : history.push("/login")
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="fw-bold mb-2 text-center text-uppercase ">
                    <img className="logo-compact" scr={logo} alt="logo" />
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={(e) => handleLogin(e)}>
                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Enter username"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Forgot Password??{" "}
                        <a href="{''}" className="text-primary fw-bold">
                          Reset Password
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
