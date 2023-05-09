import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import logo from "../../images/logo.png";
import logoText from "../../images/logo-text.png";
import axios from "axios";
import swal from "sweetalert";
import { Field, useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [ip, setIP] = useState("");
  const imgStyle = {
    width: "170px",
    height: "130px",
  };
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };

  const options = [
    { value: "Member", label: "Member" },
    { value: "President", label: "President" },
    { value: "Governor", label: "Governor" },
    { value: "SuperAdmin", label: "SuperAdmin" }
  ];

  const navigate = useNavigate();
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      cin: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      // phonenumber:'',
      club: "",
      role: "",
      image: null,
    },
    validationSchema: Yup.object({
      cin: Yup.string().max(8, "Must be 8 characters").required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      username: Yup.string()
        .max(7, "Must be 7 characters or less")
        .required("Required"),
      email: Yup.string()
        .matches(emailRules, "Please enter a valid email")
        .required("Required "),
      password: Yup.string()
        .matches(passwordRules, {
          message: "Please create a stronger password",
        })
        .required("Password is required"),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .max(8, "Must be 8 characters or less")
        .required("Required"),
      image: Yup.mixed().required(),
    }),
    onSubmit: (values) => {
      getData();
      const formUser = {
        _id: values.cin,
        firstname: values.firstName,
        lastname: values.lastName,
        username: values.username,
        email: values.email,
        phonenumber: values.phoneNumber,
        club: values.club,
        password: values.password,
        role: values.role.value,
        image: values.image,
        ip: ip,
      };

      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/register`, formUser, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          swal(
            "Thanks for signing up!",
            "Please wait untill an admin approves your account! We will notify you with an Email",
            "success"
          );
          navigate("/login");
        })
        .catch((err) => {
          console.log("err");
          swal("Oops", "Username or Email are already taken!", "error");
        });
    },
  });

  const [clubs, setClubs] = useState([]);

  function getClubs() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/clubs/getclubs`)
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getClubs();
  }, []);


  return (
    <div className="overflow-auto">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow px-4 border border-2 border-primary ">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="fw-bold mb-2 text-center text-uppercase ">
                    <img style={imgStyle} src={logoText} alt="logo" />
                    {/* <img className="brand-title" src={logoText} alt="" /> */}
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={formik.handleSubmit} noValidate>
                      <Form.Group className="mb-3 input_wrap" hasValidation>
                        <Form.Control
                          as="input"
                          type="number"
                          required
                          name="cin"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.cin}
                          isInvalid={
                            !!formik.touched.cin && !!formik.errors.cin
                          }
                        />
                        <Form.Label className="text-center">Cin</Form.Label>
                        {formik.touched.cin && formik.errors.cin ? (
                          <Form.Control.Feedback className="invalid-feedback">
                            {formik.errors.cin}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="mb-3 input_wrap " hasValidation>
                        <Row>
                          <Col>
                            <Form.Control
                              as="input"
                              type="text"
                              required
                              name="firstName"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.firstName}
                              isInvalid={
                                !!formik.touched.firstName &&
                                !!formik.errors.firstName
                              }
                            />
                            <Form.Label className="text-center md-8">
                              First Name
                            </Form.Label>
                            {formik.touched.firstName &&
                              formik.errors.firstName ? (
                              <Form.Control.Feedback className="invalid-feedback">
                                {formik.errors.firstName}
                              </Form.Control.Feedback>
                            ) : null}
                          </Col>
                          <Col>
                            <Form.Control
                              as="input"
                              type="text"
                              required
                              name="lastName"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.lastName}
                              isInvalid={
                                !!formik.touched.lastName &&
                                !!formik.errors.lastName
                              }
                            />
                            <Form.Label className="text-center ">
                              Last Name
                            </Form.Label>
                            {formik.touched.lastName &&
                              formik.errors.lastName ? (
                              <Form.Control.Feedback className="invalid-feedback">
                                {formik.errors.lastName}
                              </Form.Control.Feedback>
                            ) : null}
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className="mb-3 input_wrap" hasValidation>
                        <Row>
                          <Col>
                            <Form.Control
                              as="input"
                              type="text"
                              required
                              name="username"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.username}
                              isInvalid={
                                !!formik.touched.username &&
                                !!formik.errors.username
                              }
                            />
                            <Form.Label className="text-center">
                              Username
                            </Form.Label>
                            {formik.touched.username &&
                              formik.errors.username ? (
                              <Form.Control.Feedback className="invalid-feedback">
                                {formik.errors.username}
                              </Form.Control.Feedback>
                            ) : null}
                          </Col>
                          <Col>
                            <Form.Control
                              as="input"
                              type="email"
                              required
                              name="email"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                              isInvalid={
                                !!formik.touched.email && !!formik.errors.email
                              }
                            />
                            <Form.Label className="text-center ">
                              Email
                            </Form.Label>
                            {formik.touched.email && formik.errors.email ? (
                              <Form.Control.Feedback className="invalid-feedback">
                                {formik.errors.email}
                              </Form.Control.Feedback>
                            ) : null}
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className="mb-3 select_wrap">
                        <Row>
                          <Col>
                            <Form.Control
                              as="input"
                              type="text"
                              required
                              name="phoneNumber"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.phoneNumber}
                              isInvalid={
                                !!formik.touched.phoneNumber &&
                                !!formik.errors.phoneNumber
                              }
                            />
                            <Form.Label className="text-center">
                              Phone Number
                            </Form.Label>
                            {!!formik.touched.phoneNumber &&
                              !!formik.errors.phoneNumber ? (
                              <Form.Control.Feedback className="invalid-feedback">
                                {formik.errors.phoneNumber}
                              </Form.Control.Feedback>
                            ) : null}
                          </Col>
                          <Col>
                            <Form.Control
                              as="select"
                              name="club"
                              value={formik.values.club}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option selected disabled value="">
                                Select Your Club
                              </option>
                              {clubs.map((club) => (
                                <option key={club._id} value={club.clubname}>
                                  {club.clubname}
                                </option>
                              ))}
                            </Form.Control>
                            {formik.errors.club && formik.touched.club && (
                              <div className="invalid-feedback">{formik.errors.club}</div>
                            )}
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className="mb-3 select_wrap">
                        <Row>
                          <Col>
                            <Form.Control
                              as="select"
                              name="role"
                              onBlur={() =>
                                formik.setFieldTouched("role", true)
                              }
                            >
                              <option selected disabled value="">
                                Select Role
                              </option>
                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                          <Col>
                            <Form.Control
                              as="input"
                              name="password"
                              type="password"
                              required
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                              isInvalid={
                                !!formik.touched.password &&
                                !!formik.errors.password
                              }
                            />
                            <Form.Label>Password</Form.Label>
                            {formik.touched.password &&
                              formik.errors.password ? (
                              <Form.Control.Feedback className="invalid-feedback">
                                {formik.errors.password}
                              </Form.Control.Feedback>
                            ) : null}
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group hasValidation>
                        {/* <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            name="image"
                            onChange={(e) =>
                              formik.setFieldValue(
                                "image",
                                e.currentTarget.files[0]
                              )
                            }
                          />
                          <label className="custom-file-label">
                            Profile Picture
                          </label>
                        </div> */}
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                          hasValidation
                          type="file"
                          name="image"
                          onChange={(e) =>
                            formik.setFieldValue(
                              "image",
                              e.currentTarget.files[0]
                            )
                          }
                          isInvalid={!!formik.errors.image}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.image}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <Link to="/login" className="text-primary fw-bold">
                          Sign in
                        </Link>
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
