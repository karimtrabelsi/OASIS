import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";

import { useQuery } from "react-query";
import { GifIcon } from "@heroicons/react/24/outline";
//** Import Image */
import profile01 from "../../../../images/profile/1.jpg";
import profile02 from "../../../../images/profile/2.jpg";
import profile03 from "../../../../images/profile/3.jpg";
import profile04 from "../../../../images/profile/4.jpg";
import profile05 from "../../../../images/profile/5.jpg";
import profile06 from "../../../../images/profile/6.jpg";
import profile07 from "../../../../images/profile/7.jpg";
import profile08 from "../../../../images/profile/8.jpg";
import profile09 from "../../../../images/profile/9.jpg";
import { Dropdown, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageTitle from "../../../layouts/PageTitle";

import { SRLWrapper } from "simple-react-lightbox";
import { useFormik } from "formik";
import swal from "sweetalert";

const AppProfile = (props) => {
  const [activeToggle, setActiveToggle] = useState("posts");
  const [sendMessage, setSendMessage] = useState(false);

  const [replay, setReplay] = useState(false);

  // user update
  const [user, setuser] = useState([]);
  const userr = JSON.parse(localStorage.getItem("connectedUser"));

  const notifyBottomCenter = () => {
    toast.warn("✅ User Updated !", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const userr = JSON.parse(localStorage.getItem("connectedUser"));
    axios.get(`${process.env.REACT_APP_SERVER_URL}/users/` + userr._id).then((res) => {
      setuser(res.data);
    });
  }, []);

  function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    // console.log(form.email.value);
    const formUser = {
      _id: user._id,
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      username: form.username.value,
      email: form.email.value,
      phonenumber: form.phonenumber.value,
      club: form.club.value,
      image: form.image.files[0],
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/` + user._id, formUser, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        notifyBottomCenter();
        console.log("user updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };
  const hiddenFileInput = React.useRef(null);
  const hiddenImageInput = React.useRef(null);

  const handleClickFile = (event) => {
    hiddenFileInput.current.click();
  };

  const handleClickImage = (event) => {
    hiddenImageInput.current.click();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      link: "",
      userId: "",
      uuid: "",
      image: null,
      file: null,
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const randomId = Math.round(Math.random() * 1000000);

      const post = {
        content: values.content,
        link: values.link,
        userId: userr._id,
        uuid: randomId,
        file: values.file,
        image: values.image,
      };
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/posts/addPost`, post, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          swal(
            "Post added!",
            "Thanks for sharing your thoughts with us!",
            "success"
          );
        })
        .catch((err) => {
          console.log(err);
          swal("Oops", "Something is wrong!", "error");
        });
    },
  });

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content">
                <div className="cover-photo"></div>
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    className="img-fluid rounded-circle"
                    alt="profile"
                    width={100}
                    height={100}
                    src={require("../../../../images/users/" + userr.image)}
                    key={userr.image}
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">
                      {user.firstname} {user.lastname}
                    </h4>
                    <p>{user.role}</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{user.email}</h4>
                    <p>Email</p>
                  </div>
                  <Dropdown className="dropdown ml-auto">
                    <Dropdown.Toggle
                      variant="primary"
                      className="btn btn-primary light sharp icon-false"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        //    xmlns:xlink="http://www.w3.org/1999/xlink"
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
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-user-circle text-primary mr-2" />
                        View profile
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-users text-primary mr-2" />
                        Add to close friends
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-plus text-primary mr-2" />
                        Add to group
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-ban text-primary mr-2" />
                        Block
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="profile-statistics mb-5">
                <div className="text-center">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-b-0">150</h3>
                      <span>Follower</span>
                    </div>
                    <div className="col">
                      <h3 className="m-b-0">140</h3>
                      <span>Place Stay</span>
                    </div>
                    <div className="col">
                      <h3 className="m-b-0">45</h3>
                      <span>Reviews</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to="/app-profile"
                      className="btn btn-primary mb-1 mr-1"
                    >
                      Follow
                    </Link>
                    <Button
                      as="a"
                      to="/#"
                      className="btn btn-primary mb-1 ml-1"
                      onClick={() => setSendMessage(true)}
                    >
                      Send Message
                    </Button>
                  </div>
                </div>
                {/* send Modal */}
                <Modal className="modal fade" show={sendMessage}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Send Message</h5>
                      <Button
                        variant=""
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={() => setSendMessage(false)}
                      >
                        <span>×</span>
                      </Button>
                    </div>
                    <div className="modal-body">
                      <form
                        className="comment-form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          setSendMessage(false);
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                htmlFor="author"
                                className="text-black font-w600"
                              >
                                Name <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="Author"
                                name="Author"
                                placeholder="Author"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                htmlFor="email"
                                className="text-black font-w600"
                              >
                                Email <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="Email"
                                placeholder="Email"
                                name="email"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="comment"
                                className="text-black font-w600"
                              >
                                Comment
                              </label>
                              <textarea
                                rows={8}
                                className="form-control"
                                name="comment"
                                placeholder="Comment"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group">
                              <input
                                type="submit"
                                defaultValue="Post Comment"
                                className="submit btn btn-primary"
                                name="submit"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Modal>
                {/* Replay */}
                <Modal
                  className="modal fade show"
                  id="replyModal"
                  style={{ display: "block", paddingRight: 15 }}
                  aria-modal="true"
                  show={replay}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">Po st Reply</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      onClick={() => setReplay(false)}
                    >
                      <span>×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setReplay(false);
                      }}
                    >
                      <textarea
                        className="form-control"
                        rows={4}
                        defaultValue={"Message"}
                      />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger light"
                      data-dismiss="modal"
                      onClick={() => setReplay(false)}
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Reply
                    </button>
                  </div>
                </Modal>
              </div>
              <div className="profile-blog mb-5">
                <h5 className="text-primary d-inline">Today Highlights</h5>
                <img
                  src={profile01}
                  alt="profile"
                  className="img-fluid mt-4 mb-4 w-100"
                />
                <Link to="/post-details">
                  <h4>Darwin Creative Agency Theme</h4>
                </Link>
                <p className="mb-0">
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia. It is a paradisematic country,
                  in which roasted parts of sentences fly into your mouth.
                </p>
              </div>
              <div className="profile-interest mb-5">
                <h5 className="text-primary d-inline">Interest</h5>
                <SRLWrapper options={options}>
                  <div className="row mt-4 sp4">
                    <div className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                      <a href={profile02}>
                        <img
                          src={profile02}
                          alt="profileImage"
                          className="img-fluid"
                        />
                      </a>
                    </div>
                    <div className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                      <a href={profile03}>
                        <img
                          src={profile03}
                          alt="profile"
                          className="img-fluid"
                        />
                      </a>
                    </div>

                    <div className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                      {" "}
                      <a href={profile04}>
                        <img
                          src={profile04}
                          alt="profile"
                          className="img-fluid"
                        />
                      </a>
                    </div>

                    <div className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                      {" "}
                      <a href={profile02}>
                        <img
                          src={profile02}
                          alt="profile"
                          className="img-fluid"
                        />
                      </a>
                    </div>
                    <div className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                      <a
                        href={profile03}
                        className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                      >
                        <img
                          src={profile03}
                          alt="profile"
                          className="img-fluid"
                        />
                      </a>
                    </div>
                    <div className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6">
                      <a
                        href={profile04}
                        className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                      >
                        <img
                          src={profile04}
                          alt="profile"
                          className="img-fluid"
                        />
                      </a>
                    </div>
                  </div>
                </SRLWrapper>
              </div>
              <div className="profile-news">
                <h5 className="text-primary d-inline">Our Latest News</h5>
                <div className="media pt-3 pb-3">
                  <img
                    src={profile05}
                    alt="image"
                    className="mr-3 rounded"
                    width={75}
                  />
                  <div className="media-body">
                    <h5 className="m-b-5">
                      <Link to="/post-details" className="text-black">
                        Collection of textile samples
                      </Link>
                    </h5>
                    <p className="mb-0">
                      I shared this on my fb wall a few months back, and I
                      thought.
                    </p>
                  </div>
                </div>
                <div className="media pt-3 pb-3">
                  <img
                    src={profile06}
                    alt="image"
                    className="mr-3 rounded"
                    width={75}
                  />
                  <div className="media-body">
                    <h5 className="m-b-5">
                      <Link to="/post-details" className="text-black">
                        Collection of textile samples
                      </Link>
                    </h5>
                    <p className="mb-0">
                      I shared this on my fb wall a few months back, and I
                      thought.
                    </p>
                  </div>
                </div>
                <div className="media pt-3 pb-3">
                  <img
                    src={profile07}
                    alt="image"
                    className="mr-3 rounded"
                    width={75}
                  />
                  <div className="media-body">
                    <h5 className="m-b-5">
                      <Link to="/post-details" className="text-black">
                        Collection of textile samples
                      </Link>
                    </h5>
                    <p className="mb-0">
                      I shared this on my fb wall a few months back, and I
                      thought.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <ul className="nav nav-tabs">
                    <li
                      className="nav-item"
                      onClick={() => setActiveToggle("posts")}
                    >
                      <Link
                        to="#my-posts"
                        data-toggle="tab"
                        className={`nav-link ${
                          activeToggle === "posts" ? "active show" : ""
                        }`}
                      >
                        Posts
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => setActiveToggle("aboutMe")}
                    >
                      <Link
                        to="#about-me"
                        data-toggle="tab"
                        className={`nav-link ${
                          activeToggle === "aboutMe" ? "active show" : ""
                        }`}
                      >
                        About Me
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#profile-settings"
                        data-toggle="tab"
                        onClick={() => setActiveToggle("setting")}
                        className={`nav-link ${
                          activeToggle === "setting" ? "active show" : ""
                        }`}
                      >
                        Setting
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      id="my-posts"
                      className={`tab-pane fade ${
                        activeToggle === "posts" ? "active show" : ""
                      }`}
                    >
                      <div className="my-post-content pt-3 border ">
                        <div className="post-input border border-secondary mt-2 mb-2 pb-2 ">
                          <form onSubmit={formik.handleSubmit} noValidate>
                            <div className="d-flex justify-content-evenly">
                              <img
                                src={profile07}
                                alt="image"
                                className="mr-2 rounded mt-3 ml-1"
                                width={40}
                                height={40}
                              />
                              <textarea
                                name="content"
                                id="textarea"
                                cols="30"
                                rows="5"
                                className="form-control bg-transparent border border-0"
                                placeholder="Whats happening ?"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.content}
                                isInvalid={
                                  !!formik.touched.content &&
                                  !!formik.errors.content
                                }
                              />
                            </div>
                            <Button className="btn btn-primary light px-3 ml-2">
                              <input
                                name="link"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.link}
                                style={{ display: "none" }}
                              />
                              <i className="fa fa-link" />
                            </Button>
                            <Button
                              className="btn btn-primary light px-3 ml-2"
                              onClick={handleClickFile}
                            >
                              <input
                                name="file"
                                type="file"
                                ref={hiddenFileInput}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "file",
                                    e.currentTarget.files[0]
                                  )
                                }
                                style={{ display: "none" }}
                              />
                              <i className="fa fa-file" />
                            </Button>
                            <Button
                              className="btn btn-primary light mr-1 px-3 ml-1"
                              onClick={handleClickImage}
                            >
                              <input
                                name="image"
                                type="file"
                                ref={hiddenImageInput}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "image",
                                    e.currentTarget.files[0]
                                  );
                                }}
                                style={{ display: "none" }}
                              />
                              <i className="fa fa-camera" />
                            </Button>
                            <Button type="submit" className="btn btn-primary">
                              Post
                            </Button>
                          </form>
                        </div>
                        <div className="profile-uoloaded-post border-bottom-1 pb-5">
                          <img src={profile08} alt="" className="img-fluid" />
                          <Link className="post-title" to="/post-details">
                            <h4>Collection of textile samples lay spread</h4>
                          </Link>
                          <p>
                            A wonderful serenity has take possession of my
                            entire soul like these sweet morning of spare which
                            enjoy whole heart.A wonderful serenity has take
                            possession of my entire soul like these sweet
                            morning of spare which enjoy whole heart.
                          </p>
                          <button className="btn btn-primary mr-2">
                            <span className="mr-2">
                              <i className="fa fa-heart" />
                            </span>
                            Like
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setReplay(true)}
                          >
                            <span className="mr-2">
                              <i className="fa fa-reply" />
                            </span>
                            Reply
                          </button>
                        </div>
                        <div className="profile-uoloaded-post border-bottom-1 pb-5">
                          <img src={profile09} alt="" className="img-fluid" />
                          <Link className="post-title" to="/post-details">
                            <h4>Collection of textile samples lay spread</h4>
                          </Link>
                          <p>
                            A wonderful serenity has take possession of my
                            entire soul like these sweet morning of spare which
                            enjoy whole heart.A wonderful serenity has take
                            possession of my entire soul like these sweet
                            morning of spare which enjoy whole heart.
                          </p>
                          <button className="btn btn-primary mr-2">
                            <span className="mr-2">
                              <i className="fa fa-heart" />
                            </span>
                            Like
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setReplay(true)}
                          >
                            <span className="mr-2">
                              <i className="fa fa-reply" />
                            </span>
                            Reply
                          </button>
                        </div>
                        <div className="profile-uoloaded-post pb-3">
                          <img src={profile08} alt="" className="img-fluid" />
                          <Link className="post-title" to="/post-details">
                            <h4>Collection of textile samples lay spread</h4>
                          </Link>
                          <p>
                            A wonderful serenity has take possession of my
                            entire soul like these sweet morning of spare which
                            enjoy whole heart.A wonderful serenity has take
                            possession of my entire soul like these sweet
                            morning of spare which enjoy whole heart.
                          </p>
                          <button className="btn btn-primary mr-2">
                            <span className="mr-2">
                              <i className="fa fa-heart" />
                            </span>
                            Like
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setReplay(true)}
                          >
                            <span className="mr-2">
                              <i className="fa fa-reply" />
                            </span>
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      id="about-me"
                      className={`tab-pane fade ${
                        activeToggle === "aboutMe" ? "active show" : ""
                      }`}
                    >
                      <div className="profile-about-me">
                        <div className="pt-4 border-bottom-1 pb-3">
                          <h4 className="text-primary">About Me</h4>
                          <p className="mb-2">
                            A wonderful serenity has taken possession of my
                            entire soul, like these sweet mornings of spring
                            which I enjoy with my whole heart. I am alone, and
                            feel the charm of existence was created for the
                            bliss of souls like mine.I am so happy, my dear
                            friend, so absorbed in the exquisite sense of mere
                            tranquil existence, that I neglect my talents.
                          </p>
                          <p>
                            A collection of textile samples lay spread out on
                            the table - Samsa was a travelling salesman - and
                            above it there hung a picture that he had recently
                            cut out of an illustrated magazine and housed in a
                            nice, gilded frame.
                          </p>
                        </div>
                      </div>
                      <div className="profile-skills mb-5">
                        <h4 className="text-primary mb-2">Skills</h4>
                        <Link
                          to="/app-profile"
                          className="btn btn-primary light btn-xs mb-1 mr-1"
                        >
                          Admin
                        </Link>
                        <Link
                          to="/app-profile"
                          className="btn btn-primary light btn-xs mb-1 mr-1"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/app-profile"
                          className="btn btn-primary light btn-xs mb-1 mr-1"
                        >
                          Photoshop
                        </Link>
                        <Link
                          to="/app-profile"
                          className="btn btn-primary light btn-xs mb-1 mr-1"
                        >
                          Bootstrap
                        </Link>
                        <Link
                          to="/app-profile"
                          className="btn btn-primary light btn-xs mb-1 mr-1"
                        >
                          Responsive
                        </Link>
                        <Link
                          to="/app-profile"
                          className="btn btn-primary light btn-xs mb-1 mr-1"
                        >
                          Crypto
                        </Link>
                      </div>
                      <div className="profile-lang  mb-5">
                        <h4 className="text-primary mb-2">Language</h4>
                        <Link
                          to="/app-profile"
                          className="text-muted pr-3 f-s-16"
                        >
                          <i className="flag-icon flag-icon-us" />
                          English
                        </Link>
                        <Link
                          to="/app-profile"
                          className="text-muted pr-3 f-s-16"
                        >
                          <i className="flag-icon flag-icon-fr" />
                          French
                        </Link>
                        <Link
                          to="/app-profile"
                          className="text-muted pr-3 f-s-16"
                        >
                          <i className="flag-icon flag-icon-bd" />
                          Bangla
                        </Link>
                      </div>
                      <div className="profile-personal-info">
                        <h4 className="text-primary mb-4">
                          Personal Information
                        </h4>
                        <div className="row mb-2">
                          <div className="col-sm-3">
                            <h5 className="f-w-500">
                              Name
                              <span className="pull-right d-none d-sm-block">
                                :
                              </span>
                            </h5>
                          </div>
                          <div className="col-sm-9">
                            <span>Mitchell C.Shay</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-sm-3">
                            <h5 className="f-w-500">
                              Email
                              <span className="pull-right d-none d-sm-block">
                                :
                              </span>
                            </h5>
                          </div>
                          <div className="col-sm-9">
                            <span>example@examplel.com</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-sm-3">
                            <h5 className="f-w-500">
                              Availability
                              <span className="pull-right d-none d-sm-block">
                                :
                              </span>
                            </h5>
                          </div>
                          <div className="col-sm-9">
                            <span>Full Time (Free Lancer)</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-sm-3">
                            <h5 className="f-w-500">
                              Age
                              <span className="pull-right d-none d-sm-block">
                                :
                              </span>
                            </h5>
                          </div>
                          <div className="col-sm-9">
                            <span>27</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-sm-3">
                            <h5 className="f-w-500">
                              Location
                              <span className="pull-right d-none d-sm-block">
                                :
                              </span>
                            </h5>
                          </div>
                          <div className="col-sm-9">
                            <span>Rosemont Avenue Melbourne, Florida</span>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-sm-3">
                            <h5 className="f-w-500">
                              Year Experience
                              <span className="pull-right d-none d-sm-block">
                                :
                              </span>
                            </h5>
                          </div>
                          <div className="col-sm-9">
                            <span>07 Year Experiences</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="profile-settings"
                      className={`tab-pane fade ${
                        activeToggle === "setting" ? "active show" : ""
                      }`}
                    >
                      <div className="pt-3  ">
                        <h4 className="text-primary d-flex justify-content-center">
                          Account Setting
                        </h4>

                        <div className="settings-form  ">
                          <form onSubmit={(e) => handleRegister(e)}>
                            <br></br>
                            <div className="input_wrap w-full">
                              <input
                                type="text"
                                required
                                defaultValue={user.firstname}
                                className="form-control w-full"
                                name="firstname"
                              />
                              <label>First Name</label>
                            </div>
                            <br></br>
                            <div className="input_wrap">
                              <input
                                type="text"
                                required
                                defaultValue={user.lastname}
                                className="form-control"
                                name="lastname"
                              />
                              <label>Last Name</label>
                            </div>
                            <br></br>
                            <div className="input_wrap">
                              <input
                                type="text"
                                required
                                defaultValue={user.username}
                                className="form-control"
                                name="username"
                              />
                              <label>Username</label>
                            </div>
                            <br></br>
                            <div className="input_wrap">
                              <input
                                type="text"
                                required
                                defaultValue={user.phonenumber}
                                className="form-control"
                                name="phonenumber"
                              />
                              <label>Phone Number</label>
                            </div>
                            <br></br>
                            <div className="input_wrap">
                              <input
                                type="text"
                                required
                                defaultValue={user.club}
                                className="form-control"
                                name="club"
                              />
                              <label>Club</label>
                            </div>
                            <br></br>
                            <div class="input_wrap">
                              <input
                                type="text"
                                required
                                name="email"
                                defaultValue={user.email}
                              />
                              <label> Email</label>
                            </div>
                            <br></br>

                            <div className="input_wrap">
                              <input
                                type="file"
                                className="custom-file-input"
                                name="image"
                              />
                              <br></br>

                              <label
                                className="custom-file-label "
                                name="image"
                              >
                                Profile Picture
                              </label>
                              <br></br>
                              <br></br>
                            </div>
                            <button className="btn btn-primary" type="submit">
                              <ToastContainer
                                position="bottom-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                              />
                              Update
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppProfile;
