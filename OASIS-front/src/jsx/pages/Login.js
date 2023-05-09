import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import logo from "../../images/logo.png";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../utils/zustand";

const Login = () => {
  console.log(process.env.REACT_APP_SERVER_URL);
  const navigate = useNavigate();

  const imgStyle = {
    width: "220px",
    height: "200px",
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      const user = {
        username: values.username,
        password: values.password,
      };

      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/login`, user)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("connectedUser", res.data.user);
          useAuthStore.setState({ user: res.data.user });
          JSON.parse(res.data.user).role === "SuperAdmin" &&
            navigate("/client/home");
          JSON.parse(res.data.user).role === "Member" &&
            navigate("/client/home");
          JSON.parse(res.data.user).role === "President" &&
            navigate("/client/home");
          JSON.parse(res.data.user).role === "Governor" &&
            navigate("/client/home");
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
          } else if (err.response.data === "Invalid Username or Password") {
            swal("Oops", "Invalid Username or Password !", "error");
          } else if (err.response.data === "User not found") {
            swal("Oops", "User not found !", "error");
          } else if (
            err.response.data.msg ===
            "User is not allowed to login from this IP"
          ) {
            axios
              .post(
                `${process.env.REACT_APP_SERVER_URL}/users/twoFactorAuth/send`,
                {
                  number: err.response.data.number,
                }
              )
              .then((res) => {
                swal(
                  "Please verify yourself",
                  "Weve sent you an sms to the number : " +
                    err.response.data.number,
                  "error"
                );
                localStorage.setItem("number", err.response.data.number);
                localStorage.setItem("userLogginIn", JSON.stringify(user));
                navigate("/twofactor-auth");
              });
          }
        });
    },
  });

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="fw-bold mb-2 text-center text-uppercase">
                    <img style={imgStyle} src={logo} alt="logo" />
                  </div>
                  <div className="mb-3 input_wrap ">
                    <Form noValidate onSubmit={formik.handleSubmit}>
                      <Form.Group className="mb-3  input_wrap ">
                        <Form.Control
                          id="username"
                          type="text"
                          required
                          name="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          isValid={
                            formik.touched.username && !formik.errors.username
                          }
                          isInvalid={
                            formik.touched.username && !!formik.errors.username
                          }
                        />
                        <Form.Label>Username</Form.Label>
                        {formik.touched.username && formik.errors.username ? (
                          <Form.Control.Feedback className="invalid-feedback ">
                            {formik.errors.username}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>

                      <Form.Group className="mb-3 input_wrap">
                        <Form.Control
                          id="password"
                          type="password"
                          required
                          name="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          isValid={
                            formik.touched.password && !formik.errors.password
                          }
                          isInvalid={
                            formik.touched.password && !!formik.errors.password
                          }
                        />
                        <Form.Label>Password</Form.Label>

                        {formik.touched.password && formik.errors.password ? (
                          <Form.Control.Feedback className="invalid-feedback">
                            {formik.errors.password}
                          </Form.Control.Feedback>
                        ) : null}
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
                        <Link
                          to="/reset-password"
                          className="text-primary fw-bold"
                        >
                          Reset password
                        </Link>
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account ?{" "}
                        <Link to="/register" className="text-primary fw-bold">
                          Signup Here !
                        </Link>
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Would you like to join us as a member?{" "}
                        <Link
                          to="/recrutement"
                          className="text-primary fw-bold"
                        >
                          Join Us!
                        </Link>{" "}
                        <br />
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
