import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import logo from "../../images/logo.png";
import logoText from "../../images/logo-text.png";
import axios from "axios";
import swal from "sweetalert";

const Register = () => {
  const history = useHistory();
  function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    // console.log(form.email.value);
    const formUser = {
      _id: form.cin.value,
      firstname: form.firstName.value,
      lastname: form.lastName.value,
      username: form.username.value,
      email: form.email.value,
      phonenumber: form.phoneNumber.value,
      club: form.club.value,
      password: form.password.value,
      role: form.role.value,
      image: form.image.files[0],
    };
    // console.log(formUser);
    axios
      .post("http://localhost:3000/register", formUser, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        swal(
          "Thanks for signing up!",
          "Please wait untill an admin approves your account! We will notify you with an Email",
          "success"
        );
        history.push("/page-login");
      })
      .catch((err) => {
        console.log("err");
        swal("Oops", "Username or Email are already taken!", "error");
      });
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow px-4 border border-2 border-primary">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="fw-bold mb-2 text-center text-uppercase ">
                    <img
                      className="logo-compact"
                      src="../../images/logo-text.png"
                      alt="logo"
                    />
                    {/* <img className="brand-title" src={logoText} alt="" /> */}
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={(e) => handleRegister(e)}>
                      <Form.Group className="mb-3 ">
                        <Form.Label className="text-center">Cin</Form.Label>
                        <Form.Control
                          as="input"
                          type="number"
                          name="cin"
                          placeholder="Enter Cin"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 ">
                        <Row>
                          <Col>
                            <Form.Label className="text-center">
                              First Name
                            </Form.Label>
                            <Form.Control
                              as="input"
                              type="text"
                              name="firstName"
                              placeholder="Enter Name"
                            />
                          </Col>
                          <Col>
                            <Form.Label className="text-center ">
                              Last Name
                            </Form.Label>
                            <Form.Control
                              as="input"
                              type="text"
                              name="lastName"
                              placeholder="Enter Name"
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col>
                            <Form.Label className="text-center">
                              Username
                            </Form.Label>
                            <Form.Control
                              as="input"
                              type="text"
                              name="username"
                              placeholder="Enter Name"
                            />
                          </Col>
                          <Col>
                            <Form.Label className="text-center ">
                              Email
                            </Form.Label>
                            <Form.Control
                              as="input"
                              type="email"
                              name="email"
                              placeholder="Enter Name"
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Label className="text-center">
                              Phone Number
                            </Form.Label>
                            <Form.Control
                              as="input"
                              type="text"
                              name="phoneNumber"
                              placeholder="Enter Name"
                            />
                          </Col>
                          <Col>
                            <Form.Label className="text-center ">
                              Club
                            </Form.Label>
                            <Form.Control
                              as="input"
                              type="text"
                              name="club"
                              placeholder="Enter Name"
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col>
                            <Form.Label className="text-center ">
                              Your Role
                            </Form.Label>
                            <Form.Control
                              as="input"
                              type="text"
                              name="role"
                              placeholder="Enter Name"
                            />
                          </Col>
                          <Col>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              as="input"
                              name="password"
                              type="password"
                              placeholder="Password"
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            name="image"
                          />
                          <label className="custom-file-label">
                            Profile Picture
                          </label>
                        </div>
                      </Form.Group>

                      <div className="d-flex justify-content-center">
                        <Button
                          variant="primary"
                          type="submit"
                          // onClick={(e) => handleRegister(e)}
                        >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <a href="{''}" className="text-primary fw-bold">
                          Sign In
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

export default Register;
