import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import Swal from "sweetalert2";
import swalMessage from "@sweetalert/with-react";
import moment from 'moment';
import { Redirect } from 'react-router-dom';


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

const ClubTable = () => {
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

   const [clubs, setClubs] = useState([]);
   const [search, setSearch] = useState("");
   const [searchS, setSearchS] = useState("");
   const [searchE, setSearchE] = useState("");
   useEffect(() => {
      axios
         .get("http://localhost:3000/clubs/getclubs")
         .then((res) => {
            setClubs(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
      search && setClubs(clubs.filter((club) => club.clubname.includes(search)));
      searchS && setClubs(clubs.filter((club) => club.region.includes(search)));
      searchE && setClubs(clubs.filter((club) => club.city.includes(search)));
   }, [clubs]);

   return (
      <Fragment>
         <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>Clubs</Card.Title>
                     <div className="d-flex justify-content-between ">
                        <div className="input-group search-area d-lg-inline-flex d-none mr-5">
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
                     
                  </Card.Header>
                  <Card.Body>
                     {clubs
                        
                        .reduce((accumulator, club, index) => {
                           if (index % 3 === 0) {
                              accumulator.push([]);
                           }
                           accumulator[accumulator.length - 1].push(
                              <Card key={club.id} className="my-3">
                                 <Card.Header>
                                    <div className="d-flex justify-content-between">
                                       <h5>{club.clubname}</h5>
                                    </div>
                                    

                                 </Card.Header>
                                 <Card.Img variant="top" src={avatar3} />
                                 <Card.Body>
                                    <Card.Title>Club Name : {club.clubname}</Card.Title>
                                    <Card.Text>City : {club.city}</Card.Text>
                                    <Card.Text>Email : {club.email}</Card.Text>
                                    <Card.Text>Type : {club.type}</Card.Text> 
                                    <div className="d-flex justify-content-between">
                                       <button type="button" class="btn btn-outline-info btn-rounded" variant="primary" onClick={() => {
                                          Swal.fire({
                                             title: club.clubname,
                                             html: `
            <p>Sponsor Club: ${club.club}</p>
            <p>Club Name: ${club.clubname}</p>
            <p>Founding President: ${club.foundingpresident.firstname}</p>
            <p>Bord: ${club.board}</p>
            <p>City: ${club.city}</p>
            <p>Region: ${club.region}</p>
            <p>Members: ${club.members}</p>
            <p>Number of Mumbers: ${club.membersN}</p>
            <p>Email: ${club.email}</p>
            <p>Type: ${club.type}</p>



            
        `
                                          });
                                       }}>Details</button>
                                      
                                       
                                    </div>
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

export default ClubTable;