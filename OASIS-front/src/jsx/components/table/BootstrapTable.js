import React, { Fragment, useEffect, useState } from "react";
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
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

  const handleApprove = (id) => {
    axios.post("http://localhost:3000/users/approve/" + id).catch((err) => {
      console.log(err);
    });
  };
  const handleBan = (id) => {
    axios
      .post("http://localhost:3000/users/ban/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>
                        <strong>{user._id}</strong>
                      </td>
                      <td>{user.firstname + " " + user.lastname}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
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
                                    "http://localhost:3000/users/approve/" +
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
                                  text: "Once Banned, user will not be able to login !",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true,
                                }).then(() =>
                                  axios
                                    .post(
                                      "http://localhost:3000/users/ban/" +
                                        user._id
                                    )
                                    .then((res) => {
                                      // console.log(res)
                                      if ((res.respone = 200)) {
                                        swal("User Banned !", {
                                          icon: "success",
                                        });
                                      } else {
                                        swal("Nothing changed !");
                                      }
                                    })
                                )
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
