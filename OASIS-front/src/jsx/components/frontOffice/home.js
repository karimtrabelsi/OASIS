import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import PostWidget from "./postWidget";
import "../../../css/post.css";
import { Button, Nav, Tab } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import useAuthStore from "../../../utils/zustand";

const HomeFront = () => {
  const { user } = useAuthStore();

  const fetchPosts = async () => {
    return await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/allPosts`);
  };

  const { status, data, error, refetch, isLoading, isRefetching, isSuccess } =
    useQuery({
      queryKey: ["allPosts"],
      queryFn: fetchPosts,
    });

  const handleRefetch = () => {
    refetch();
  };
  const hiddenFileInput = React.useRef(null);
  const hiddenImageInput = React.useRef(null);

  const [filter, setFilter] = React.useState();
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
      content: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const randomId = Math.round(Math.random() * 1000000);

      const post = {
        content: values.content,
        link: values.link,
        userId: JSON.parse(user)._id,
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
          refetch();
        })
        .catch((err) => {
          console.log(err);
          swal("Oops", "Something is wrong!", "error");
        });
    },
  });

  return (
    <>
      <div className="mt-10">
        {/* create post card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Create Post</h3>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="d-flex justify-content-evenly">
                <img
                  src={require("../../../images/users/" +
                    JSON.parse(user).image)}
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
                    !!formik.touched.content && !!formik.errors.content
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
                    formik.setFieldValue("file", e.currentTarget.files[0])
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
                    formik.setFieldValue("image", e.currentTarget.files[0]);
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
        </div>
      </div>
      {/* tabs */}
      <div className="mt-10 d-flex justify-content-center">
        <div className="custom-tab-1">
          <Tab.Container defaultActiveKey={1}>
            <Nav as="ul" className="nav-tabs">
              <Nav.Item as="li">
                <Nav.Link eventKey={1} onClick={() => setFilter("all")}>
                  <i className={`la la-home mr-2`} />
                  All Posts
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey={2}>
                  <i
                    className={`la la-home mr-2`}
                    onClick={() => setFilter("club")}
                  />
                  My Club Posts
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </div>
      </div>
      {/* posts */}
      {isSuccess &&
        data.data
          .filter((post) =>
            filter === "club" ? post.user.club === JSON.parse(user).club : true
          )
          .map((post) => (
            <div classname="">
              <PostWidget
                image={post.image}
                userId={post.userId}
                uuid={post.uuid}
                userr={post.user}
                content={post.content}
                post={post}
                handleRefetch={handleRefetch}
              />
            </div>
          ))}
    </>
  );
};

export default HomeFront;
