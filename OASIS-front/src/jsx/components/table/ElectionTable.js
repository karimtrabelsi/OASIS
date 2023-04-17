import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import Swal from "sweetalert2";
import swalMessage from "@sweetalert/with-react";
import moment from 'moment';


import {
   Row,
   Col,
   Card,
   CardDeck,
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

const ElectionTable = () => {
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

   const [elections, setElections] = useState([]);
   const [search, setSearch] = useState("");
   const userr = JSON.parse(localStorage.getItem("connectedUser"));
   useEffect(() => {
      axios
         .get("http://localhost:3000/election")
         .then((res) => {
            setElections(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
      search && setElections(elections.filter((election) => election.name.includes(search)));
   }, [elections]);

   return (
      <Fragment>
         <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>Elections</Card.Title>
                     <Button onClick={() => Swal.fire({
                                       title: 'Enter your details',
                                       html: '<input type="text" id="name" placeholder="Name">' +
                                          '<input type="email" id="email" placeholder="Email">',
                                       showCancelButton: true,
                                       confirmButtonText: 'Submit'
                                    }).then((result) => {
                                       if (result.isConfirmed) {
                                          // Handle form submission here
                                          const name = document.getElementById('name').value;
                                          const email = document.getElementById('email').value;
                                          console.log('Name:', name);
                                          console.log('Email:', email);
                                          Swal.fire({
                                             title: 'Form submitted',
                                             text: 'Thank you for submitting the form.',
                                             icon: 'success'
                                          });
                                       }
                                    })
                                 }
                     variant="primary">+</Button>
                  </Card.Header>
                  <Card.Body>
                     {elections
                        .filter((election) => election.club === userr.club)
                        .reduce((accumulator, election, index) => {
                           if (index % 3 === 0) {
                              accumulator.push([]);
                           }
                           accumulator[accumulator.length - 1].push(
                              <Card key={election.id} className="my-3">
                                 <Card.Header>
                                    <h5>{election.name}</h5>
                                 </Card.Header>
                                 <Card.Img variant="top" src={avatar3} />
                                 <Card.Body>
                                    <Card.Title>Club : {election.club}</Card.Title>
                                    <Card.Text>Description : {election.description}</Card.Text>
                                    <Card.Text>Start Date : {moment(election.startDate).format('MM/DD/YYYY')}</Card.Text>
                                    <Card.Text>End Date : {moment(election.endDate).format('MM/DD/YYYY')}</Card.Text>
                                    <Card.Text>Candidates : {election.candidates}</Card.Text>
                                    <Button  variant="primary">View Details</Button>
                                 <Button
                                    onClick={() =>
                                       swal({
                                          title: "Are you sure?",
                                          text: "Once deleted, election will not be available anymore !",
                                          icon: "warning",
                                          buttons: true,
                                          dangerMode: true,
                                       }).then((willDelete) => {
                                          if (willDelete) {
                                             axios
                                                .delete(
                                                   "http://localhost:3000/election/deleteElection/" +
                                                   election._id
                                                )
                                                .then((res) => {
                                                   // console.log(res)
                                                   if ((res.respone = 200)) {
                                                      swal(
                                                         election.name + "deleted !",
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
                                    variant="primary">Delete</Button>
                              </Card.Body>
                </Card>
               );
               return accumulator;
            }, [])
            .map((cardDeck, index) => <CardDeck key={index}>{cardDeck}</CardDeck>)
          }
            </Card.Body>
         </Card>
      </Col>
  </Row >
</Fragment >

   );
};

export default ElectionTable;
