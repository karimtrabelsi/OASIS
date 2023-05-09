import React, { Fragment, useContext, useEffect, useState } from "react";
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
import AuthContext from "../../../utils/zustand";
import useAuthStore from "../../../utils/zustand";
import ReactPaginate from 'react-paginate';


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

   const { user } = useAuthStore();

   // Determine if the logged-in user has the role "Member"
   const isMember = user && JSON.parse(user).role === "Member";

   const [elections, setElections] = useState([]);
   const [clubs, setClubs] = useState([]);
   const [search, setSearch] = useState("");
   const [searchS, setSearchS] = useState("");
   const [searchE, setSearchE] = useState("");
   const [currentPage, setCurrentPage] = useState(0);
   const [itemsPerPage, setItemsPerPage] = useState(3);
   const indexOfLastItem = (currentPage + 1) * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = elections.slice(currentPage * 2, currentPage * 2 + 2);


   const startDate = document.getElementById("startDate");
   const endDate = document.getElementById("endDate");


   function validateStartDate() {
      const currentDate = new Date().toISOString().split("T")[0];
      const selectedDate = startDate.value;

      if (selectedDate < currentDate) {
         Swal.showValidationMessage("Start Date must be after or equal to the current date.");
      }
   }

   function validateEndDate() {
      const startDateValue = startDate.value;
      const endDateValue = endDate.value;

      if (endDateValue < startDateValue) {
         Swal.showValidationMessage("End Date must be after Start Date.");
      }
   }

   const userr = JSON.parse(localStorage.getItem("connectedUser"));
   useEffect(() => {
      axios
         .get(`${process.env.REACT_APP_SERVER_URL}/election`)
         .then((res) => {
            setElections(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
      search && setElections(elections.filter((election) => election.name.includes(search)));
      searchS && setElections(elections.filter((election) => election.moment(election.endDate).format('MM/DD/YYYY').includes(search)));
      searchE && setElections(elections.filter((election) => election.moment(election.endDate).format('MM/DD/YYYY').includes(search)));
   }, [elections]);

   useEffect(() => {
      getClubs();
    }, []);

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


   return (
      <Fragment>
         <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>Elections</Card.Title>
                     <div className="d-flex justify-content-center">
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
                     {!isMember && (
                        <button type="button" class="btn btn-info btn-rounded"
                           onClick={async () => {
                              Swal.fire({
                                 title: 'Add Election',
                                 html:
                                    '<input id="name" class="swal2-input" placeholder="Name">' +
                                    '<div class="form-group">' +
                                    '<label for="club">Club:</label>' +
                                    '<select id="club" class="form-control">' +
                                    clubs.map((club) => '<option value="' + club._id + '">' + club.clubname + '</option>') +
                                    '</select>' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                    '<label for="type">Type:</label>' +
                                    '<select id="type" class="form-control">' +
                                    '<option value="ExecutiveBoard">ExecutiveBoard</option>' +
                                    '<option value="ExpandedBoard">ExpandedBoard</option>' +
                                    '</select>' +
                                    '</div>' +
                                    '<textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>' +
                                    '<input type="date" id="startDate" class="swal2-input" placeholder="Start Date">' +
                                    '<input type="date" id="endDate" class="swal2-input" placeholder="End Date">',
                                 focusConfirm: false,
                                 preConfirm: () => {
                                    const name = document.getElementById('name').value;
                                    const club = document.getElementById('club').value;
                                    const type = document.getElementById('type').value;
                                    const description = document.getElementById('description').value;
                                    const startDate = document.getElementById('startDate').value;
                                    const endDate = document.getElementById('endDate').value;
                                    const currentDate = new Date().toISOString().split('T')[0];
                                    if (!name || !club || !description || !startDate || !endDate) {
                                       Swal.showValidationMessage('Please fill in all fields');
                                    } else if (startDate < currentDate) {
                                       Swal.showValidationMessage('Start date cannot be before current date');
                                    } else if (endDate <= startDate) {
                                       Swal.showValidationMessage('End date must be after start date');
                                    }
                                    return { name: name, club: club, type: type, description: description, startDate: startDate, endDate: endDate };
                                 }
                              }).then(result => {
                                 if (result.isConfirmed) {
                                    fetch(`${process.env.REACT_APP_SERVER_URL}/election/newElection`, {
                                       method: 'POST',
                                       headers: {
                                          'Content-Type': 'application/json'
                                       },
                                       body: JSON.stringify(result.value)
                                    })
                                       .then(response => {
                                          if (!response.ok) {
                                             throw new Error('Network response was not ok');
                                          }
                                          Swal.fire({
                                             icon: 'success',
                                             title: 'Election added successfully',
                                             showConfirmButton: false,
                                             timer: 1500
                                          });
                                       })
                                       .catch(error => {
                                          console.error('There was an error adding the election:', error);
                                          Swal.fire({
                                             icon: 'error',
                                             title: 'Oops...',
                                             text: 'Something went wrong!'
                                          });
                                       });
                                 }
                              })
                           }
                           }
                           variant="primary"

                        ><span class="btn-icon-left text-info"><i class="fa fa-plus color-info"></i></span>Add</button>
                     )}

                  </Card.Header>
                  <Card.Body>
                     {currentItems
                        .filter((election) => election.club.clubname === userr.club)
                        .reduce((accumulator, election, index) => {
                           if (index % 3 === 0) {
                              accumulator.push([]);
                           }
                           accumulator[accumulator.length - 1].push(
                              <Card key={election.id} className="my-3">
                                 <Card.Header>
                                    <div className="d-flex justify-content-between">
                                       <h5>{election.name}</h5>
                                    </div>
                                    {!isMember && (
                                       <button type="button" className="btn btn-outline-danger btn-rounded" onClick={() =>
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
                                                      `${process.env.REACT_APP_SERVER_URL}/election/deleteElection/` +
                                                      election._id
                                                   )
                                                   .then((res) => {
                                                      // console.log(res)
                                                      if ((res.respone = 200)) {
                                                         swal(
                                                            election.name + " deleted !",
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
                                          variant="primary"><i className="fa fa-close"></i></button>
                                    )}

                                 </Card.Header>
                                 <Card.Img variant="top" src={avatar3} />
                                 <Card.Body>
                                    <Card.Title>Club : {election.club.clubname}</Card.Title>
                                    <Card.Text>Type : {election.type}</Card.Text>
                                    <Card.Text>Start Date : {moment(election.startDate).format('MM/DD/YYYY')}</Card.Text>
                                    <Card.Text>End Date : {moment(election.endDate).format('MM/DD/YYYY')}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                       <button type="button" class="btn btn-outline-info btn-rounded" variant="primary" onClick={() => {
                                          Swal.fire({
                                             title: election.name,
                                             html: `
            <p>Club: ${election.club.clubname}</p>
            <p>Description: ${election.description}</p>
            <p>Start Date: ${moment(election.startDate).format('MM/DD/YYYY')}</p>
            <p>End Date: ${moment(election.endDate).format('MM/DD/YYYY')}</p>
            <p>Candidates: ${election.candidates.map(candidate => candidate.user.firstname).join(', ')}</p>
        `
                                          });
                                       }}>Details</button>
                                       {!isMember && (
                                          <button type="button" class="btn btn-outline-info btn-rounded" onClick={() => {
                                             Swal.fire({
                                                title: 'Update Election',
                                                html:
                                                   'Name :<input id="name" class="swal2-input" placeholder="Name" value="' + election.name + '">' +
                                                   '<div class="form-group">' +
                                                   '<label for="type">Type:</label>' +
                                                   '<select id="type" class="form-control">' +
                                                   '<option value="ExecutiveBoard">ExecutiveBoard</option>' +
                                                   '<option value="ExpandedBoard">ExpandedBoard</option>' +
                                                   '</select>' +
                                                   '</div>' +
                                                   'Description :<textarea id="description" class="swal2-textarea" placeholder="Description">' + election.description + '</textarea>' +
                                                   'Start Date :<input type="date" id="startDate" class="swal2-input" placeholder="Start Date" value="' + moment(election.startDate).format('YYYY-MM-DD') + '">' +
                                                   'End Date :<input type="date" id="endDate" class="swal2-input" placeholder="End Date" value="' + moment(election.endDate).format('YYYY-MM-DD') + '">',
                                                focusConfirm: false,
                                                preConfirm: () => {
                                                   const name = document.getElementById('name').value;
                                                   const type = document.getElementById('type').value;
                                                   const description = document.getElementById('description').value;
                                                   const startDate = document.getElementById('startDate').value;
                                                   const endDate = document.getElementById('endDate').value;
                                                   const currentDate = new Date().toISOString().split('T')[0];
                                                   if (!name || !description || !startDate || !endDate) {
                                                      Swal.showValidationMessage('Please fill in all fields');
                                                   } else if (startDate < currentDate) {
                                                      Swal.showValidationMessage('Start date cannot be before current date');
                                                   } else if (endDate <= startDate) {
                                                      Swal.showValidationMessage('End date must be after start date');
                                                   }
                                                   return { name: name, type: type, description: description, startDate: startDate, endDate: endDate };
                                                }
                                             }).then(result => {
                                                if (result.isConfirmed) {
                                                   const updateData = {
                                                      name: result.value.name,
                                                      club: result.value.club,
                                                      type: result.value.type,
                                                      description: result.value.description,
                                                      startDate: result.value.startDate,
                                                      endDate: result.value.endDate,
                                                      candidates: result.value.candidates
                                                   }
                                                   axios.put(`${process.env.REACT_APP_SERVER_URL}/election/updateElection/${election._id}`, updateData, {
                                                      headers: {
                                                         'Content-Type': 'application/json'
                                                      }
                                                   }).then(response => {
                                                      if (response.status === 200) {
                                                         Swal.fire({
                                                            icon: 'success',
                                                            title: 'Election updated successfully',
                                                            showConfirmButton: false,
                                                            timer: 1500
                                                         }).then(() => {
                                                         });
                                                      } else {
                                                         Swal.fire({
                                                            icon: 'error',
                                                            title: 'Failed to update election',
                                                         });
                                                      }
                                                   }).catch(error => {
                                                      console.error(error);
                                                      Swal.fire({
                                                         icon: 'error',
                                                         title: 'Failed to update election',
                                                      });
                                                   });
                                                }
                                             })
                                          }
                                          }
                                             variant="primary" > Update </button>
                                       )}
                                       <Link to={`/client/table-apply?id=${election._id}`}>
                                          <button type="button" className="btn btn-outline-info btn-rounded">Join</button>
                                       </Link>
                                    </div>
                                 </Card.Body>
                              </Card>
                           );
                           return accumulator;
                        }, [])
                        .map((cardDeck, index) => <CardDeck key={index}>{cardDeck}</CardDeck>)
                     }
                     <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={Math.ceil(elections.length / 2)}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                     />
                  </Card.Body>
               </Card>
            </Col>
         </Row >
      </Fragment >

   );
};

export default ElectionTable;
