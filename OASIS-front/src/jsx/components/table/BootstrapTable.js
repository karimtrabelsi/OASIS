import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import swalMessage from "@sweetalert/with-react";

import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Error404 from "../../pages/Error404";
import useAuthStore from "../../../utils/zustand";


const BootstrapTable = () => {
  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );

  const [users, setUsers] = useState([]);
  const [bannedUsers, setBannedUsers] = useState(false);
  const [newUsers, setNewUsers] = useState(false);
  const [search, setSearch] = useState("");
  const isMounted = useRef(true);

  const { user } = useAuthStore();

  // Determine if the logged-in user has the role "Member"
  
  const fetchData = useCallback(async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
    if (isMounted.current) {
      setUsers(response.data);
    }
  }, [users]);
  useEffect(() => {
    const userr = JSON.parse(localStorage.getItem("connectedUser"));

    axios.get(`${process.env.REACT_APP_SERVER_URL}/users`).then((res) => {
    setUsers(res.data);
    }).catch((err) => {
      console.log(err);
    });


    bannedUsers && setUsers(users.filter((user) => user.banned === true));
    newUsers && setUsers(users.filter((user) => user.approved === false));
    search && setUsers(users.filter((user) => user.username.includes(search)));
    return () => {
      isMounted.current = false;
    };
  }, [users]);

  const handleApprove = (id) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/users/approve/` + id).catch((err) => {
      console.log(err);
    });
  };
  const handleBan = (id) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/ban/` + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  if (JSON.parse(user).role !== "SuperAdmin") {
    return (
       <Error404/>
    )
  }

  return (
    <Fragment>
      <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between ">
                <Badge
                  variant={
                    bannedUsers ? "dark badge-xl dark" : "light badge-xl light"
                  }
                  className=""
                  onClick={() => setBannedUsers(!bannedUsers)}
                >
                  Banned Users{" "}
                </Badge>
                <Badge
                  variant={
                    newUsers ? "dark badge-xl dark" : "light badge-xl light"
                  }
                  className=""
                  onClick={() => setNewUsers(!newUsers)}
                >
                  New Users{" "}
                </Badge>
                <div className="input-group search-area d-lg-inline-flex d-none ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                          fill="#A4A4A4"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="width80">
                      <strong>#CIN</strong>
                    </th>
                    <th>
                      <strong>NAME</strong>
                    </th>
                    <th>
                      <strong>USERNAME</strong>
                    </th>
                    <th>
                      <strong>EMAIL</strong>
                    </th>
                    <th>
                      <strong>ROLE</strong>
                    </th>
                    <th>
                      <strong>STATUS</strong>
                    </th>
                    <th></th>
                    <th>
                      <strong>CLUB</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) => user.role !== "SuperAdmin")
                    .map((user, index) => (
                      <tr key={user._id}>
                        <td>
                          <strong>{user._id}</strong>
                        </td>
                        <td>{user.firstname + " " + user.lastname}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`badge badge-${
                              user.role === "SuperAdmin"
                                ? "danger"
                                : user.role === "Member"
                                ? "info"
                                : user.role === "President"
                                ? "dark"
                                : "warning"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>
                          {user.approved ? (
                            <Badge variant="success light">Approved</Badge>
                          ) : (
                            <Badge
                              variant="warning light"
                              onClick={() =>
                                swal({
                                  title: "Are you sure?",
                                  text: "Once Approved, user will be able to login !",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true,
                                }).then(() =>
                                  axios
                                    .post(
                                      `${process.env.REACT_APP_SERVER_URL}/users/approve/` +
                                        user._id
                                    )
                                    .then((res) => {
                                      // console.log(res)
                                      if ((res.respone = 200)) {
                                        swal("User has been approved!", {
                                          icon: "success",
                                        });
                                      } else {
                                        swal("Nothing changed !");
                                      }
                                    })
                                )
                              }
                            >
                              Pending
                            </Badge>
                          )}
                        </td>
                        <td>
                          {user.banned && (
                            <Badge variant="warning light">Banned</Badge>
                          )}
                        </td>
                        <td>{user.club}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              className="light sharp icon-false"
                            >
                              {svg1}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                as={Button}
                                // onClick={() => handleBan(user._id)}
                                onClick={() =>
                                  swal({
                                    title: "Are you sure?",
                                    text: user.banned
                                      ? "Unban User"
                                      : "Once Banned, user will not be able to login !",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                  }).then((willBan) => {
                                    if (willBan) {
                                      axios
                                        .post(
                                          `${process.env.REACT_APP_SERVER_URL}/users/ban/` +
                                            user._id
                                        )
                                        .then((res) => {
                                          // console.log(res)
                                          if ((res.respone = 200)) {
                                            swal(
                                              user.banned
                                                ? "User Unbanned!"
                                                : "User Banned !",
                                              {
                                                icon: "success",
                                              }
                                            );
                                          } else {
                                            swal("Connection Error!");
                                          }
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                    } else {
                                      swal("Nothing changed !");
                                    }
                                  })
                                }
                              >
                                {user.banned ? "Unban" : "Ban"}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default BootstrapTable;
