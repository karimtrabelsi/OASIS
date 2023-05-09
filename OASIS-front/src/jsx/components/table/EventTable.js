import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import Swal from "sweetalert2";
import swalMessage from "@sweetalert/with-react";
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


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

const EventTable = () => {
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
   const [events, setEvents] = useState([]);
   const [search, setSearch] = useState("");
   const [searchS, setSearchS] = useState("");
   const [searchE, setSearchE] = useState("");
   const userr = JSON.parse(localStorage.getItem("connectedUser"));
   const [currentPage, setCurrentPage] = useState(0);
   const [itemsPerPage, setItemsPerPage] = useState(3);
   const indexOfLastItem = (currentPage + 1) * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = events.slice(currentPage * 3, currentPage * 3 + 3);

   const startDate = document.getElementById("startDate");
   const endDate = document.getElementById("endDate");
   function validateStartDate() {
      const currentDate = new Date().toISOString().split("T")[0];
      const selectedDate = startDate.value;
      if (selectedDate < currentDate) {
         Swal.showValidationMessage("Start Date must be after or equal to the current date.");
      }
   };

   function validateEndDate() {
      const startDateValue = startDate.value;
      const endDateValue = endDate.value;

      if (endDateValue < startDateValue) {
         Swal.showValidationMessage("End Date must be after Start Date.");
      }
   };


   useEffect(() => {
      axios
         .get(`${process.env.REACT_APP_SERVER_URL}/getEvent`)
         .then((res) => {
            setEvents(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
      search && setEvents(events.filter((event) => event.eventname.includes(search)));
      searchS && setEvents(events.filter((event) => moment(event.startDate).format('MM/DD/YYYY').includes(searchS)));
      searchE && setEvents(events.filter((event) => moment(event.enddate).format('MM/DD/YYYY').includes(searchE)));
   }, [events, search, searchS, searchE]);

   // On crée une constante qui va contenir le tableau des événements filtrés
   const filteredEvents = events.filter(event => {
      // On vérifie si le nom de l'événement contient le terme de recherche (en ignorants les majuscules et minuscules)
      const eventnameMatch = event.eventname.toLowerCase().includes(searchTerm.toLowerCase());
      // On vérifie si le lieu de l'événement contient le terme de recherche (en ignorants les majuscules et minuscules)
      const placeMatch = event.place.toLowerCase().includes(searchTerm.toLowerCase());
      const searchTerm = document.getElementById('search').value;
      // On retourne l'événement si au moins l'un des deux critères est vérifié
      return eventnameMatch || placeMatch;
   });
   // On crée une fonction qui va ajouter un événement à la base de données


   return (
      <Fragment>
         <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>Events List</Card.Title>
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

                     <button type="button" class="btn btn-info btn-rounded"
                        onClick={() => Swal.fire({
                           title: 'Enter your Event details',
                           html:
                              '<input type="text" id="eventname" class="swal2-input" placeholder="eventname">' +
                              '<input type="date" id="startDate" class="swal2-input" placeholder="startdate">' +
                              '<input type="date" id="enddate" class="swal2-input" placeholder="enddate">' +
                              '<input type="text" id="place" class="swal2-input" placeholder="place">' +
                              '<input type="text" id="collaborateur" class="swal2-input" placeholder="collaborateur">' +
                              '<div class="swal2-input">' +
                              '<label for="typeEvent" >Event Type :</label>' +
                              '<select id="typeEvent" name="typeEvent">' +
                              '<option value="charityevent">Charity Event</option>' +
                              '<option value="teambuilding">Team Building</option>' +
                              '<option value="protraining">Pro Training</option>' +
                              '</select>' +
                              '</div>' +
                              '<div class="swal2-input">' +
                              '<label for="axes">Global Causes:</label>' +
                              '<select id="axes" name="axes">' +
                              '<option value="diabetes">Diabetes</option>' +
                              '<option value="vision">Vision</option>' +
                              '<option value="hunger">Hunger</option>' +
                              '<option value="environment">Environment</option>' +
                              '<option value="ChildhoodCancer">ChildhoodCancer</option>' +
                              '</select>' +
                              '</div>',
                           focusConfirm: false,
                           preConfirm: () => {
                              const eventname = document.getElementById("eventname").value;
                              // const startdate = document.getElementById("startdate").value;
                              const startdateInput = document.querySelector("#startdate");
                              const startdate = startdateInput ? startdateInput.value : "";

                              const enddate = document.getElementById("enddate").value;
                              const place = document.getElementById("place").value;
                              const collaborateur = document.getElementById("collaborateur").value;
                              const typeEvent = document.getElementById("typeEvent").addEventListener("change", function () {
                                 alert("Vous avez sélectionné " + this.value);
                              });
                              const axes = document.getElementById("axes").value;
                              //  if (!eventname || !startDate || !enddate || !place  || !collaborateur || !typeEvent || !axes ) {
                              //     Swal.showValidationMessage('Please fill in all fields');
                              //  }
                              const newEvent = {
                                 name: eventname,
                                 startdate: startdate,
                                 endDate: enddate,
                                 place: place,
                                 collaborateur: collaborateur,
                                 typeEvent: typeEvent,
                                 axes: axes
                              };
                              const currentDate = new Date().toISOString().split('T')[0];
                              if (!eventname || !startDate || !enddate || !place || !collaborateur || !typeEvent || !axes) {
                                 Swal.showValidationMessage('Please fill in all fields');
                              } else if (startDate < currentDate) {
                                 Swal.showValidationMessage('Start date cannot be before current date');
                              } else if (endDate <= startDate) {
                                 Swal.showValidationMessage('End date must be after start date');
                              }
                              return { eventname: eventname, startDate: startdate, enddate: enddate, place: place, collaborateur: collaborateur, typeEvent: typeEvent, axes: axes };

                           }
                        })
                           .then(result => {
                              if (result.isConfirmed) {
                                 console.log(result.value);
                                 fetch(`${process.env.REACT_APP_SERVER_URL}/event`, {
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
                                          title: 'Your Event added successfully',
                                          showConfirmButton: false,
                                          timer: 1500
                                       });
                                    })
                                    .catch(error => {
                                       console.error('There was an error adding your Event:', error);
                                       Swal.fire({
                                          icon: 'error',
                                          title: 'Oops...',
                                          text: 'Something went wrong!'
                                       });
                                    });
                              }
                           })
                        }
                        variant="primary"
                     ><span class="btn-icon-left text-info"><i class="fa fa-plus color-info"></i></span>Add Event</button>

                  </Card.Header>
                  <Card.Body>
                     {currentItems
                        .reduce((accumulator, event, index) => {
                           if (index % 3 === 0) {
                              accumulator.push([]);
                           }
                           accumulator[accumulator.length - 1].push(
                              <Card key={event._id} className="my-3">
                                 <Card.Header>
                                    <div className="d-flex justify-content-between">
                                       <h5>{event.eventname}</h5>
                                    </div>
                                    <button type="button" className="btn btn-outline-danger btn-rounded" onClick={() =>
                                       swal({
                                          title: "Are you sure?",
                                          text: "Once deleted, event will not be available anymore !",
                                          icon: "warning",
                                          buttons: true,
                                          dangerMode: true,
                                       }).then((willDelete) => {
                                          if (willDelete) {
                                             axios
                                                .delete(
                                                   `${process.env.REACT_APP_SERVER_URL}/Table-Event/event/deletEvent/` +
                                                   event._id
                                                )
                                                .then((res) => {
                                                   // console.log(res)
                                                   if ((res.respone = 200)) {
                                                      swal(
                                                         event.eventname + " deleted !",
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
                                 </Card.Header>
                                 <Card.Img variant="top" src={avatar1} />
                                 <Card.Body>
                                    <Card.Text>Place: {event.place}</Card.Text>
                                    <Card.Text>Event Type: {event.typeEvent}</Card.Text>
                                    <Card.Text>Axe: {event.axes}</Card.Text>
                                    <Card.Text>Start date: {moment(event.startdate).format('MM/DD/YYYY')}</Card.Text>
                                    <Card.Text>End date: {moment(event.enddate).format('MM/DD/YYYY')}</Card.Text>
                                    <Card.Text>Collaborator: {event.collaborateur}</Card.Text>
                                    <Card.Text>Contribution: {event.cotisation}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                       <button type="button" class="btn btn-outline-info btn-rounded" variant="primary" onClick={() => {
                                          Swal.fire({
                                             title: event.eventname,
                                             html: `
                                            <p><strong>Place:</strong> ${event.place}</p>
                                            <p><strong>Event Type:</strong> ${event.typeEvent}</p>
                                            <p><strong>Axe:</strong> ${event.axes}</p>
                                            <p><strong>Start Date:</strong> ${moment(event.startdate).format('MM/DD/YYYY')}</p>
                                            <p><strong>End Date:</strong> ${moment(event.enddate).format('MM/DD/YYYY')}</p>
                                            <p><strong>Collaborator:</strong> ${event.collaborateur}</p>
                                            <p><strong>Contribution:</strong> ${event.cotisation}</p>
                                            `
                                          });
                                       }}>Event Details</button>
                                       <button type="button" class="btn btn-outline-info btn-rounded" onClick={() => {
                                          Swal.fire({
                                             title: 'Update your Event',
                                             html:
                                                '<input type="text" id="eventname" class="swal2-input" placeholder="eventname">' +
                                                '<input type="date" id="startDate" class="swal2-input" placeholder="startdate">' +
                                                '<input type="date" id="enddate" class="swal2-input" placeholder="enddate">' +
                                                '<input type="text" id="place" class="swal2-input" placeholder="place">' +
                                                '<input type="text" id="collaborateur" class="swal2-input" placeholder="collaborateur">' +
                                                '<div class="swal2-input">' +
                                                '<label for="typeEvent" >Event Type :</label>' +
                                                '<select id="typeEvent" name="typeEvent">' +
                                                '<option value="charityevent">Charity Event</option>' +
                                                '<option value="teambuilding">Team Building</option>' +
                                                '<option value="protraining">Pro Training</option>' +
                                                '</select>' +
                                                '</div>' +
                                                '<div class="swal2-input">' +
                                                '<label for="axes">Global Causes:</label>' +
                                                '<select id="axes" name="axes">' +
                                                '<option value="diabetes">Diabetes</option>' +
                                                '<option value="vision">Vision</option>' +
                                                '<option value="hunger">Hunger</option>' +
                                                '<option value="environment">Environment</option>' +
                                                '<option value="ChildhoodCancer">Childhood Cancer</option>' +
                                                '</select>' +
                                                '</div>',
                                             focusConfirm: false,
                                             preConfirm: () => {
                                                const eventname = document.getElementById("eventname").value;
                                                // const startdate = document.getElementById("startdate").value;
                                                const startdateInput = document.querySelector("#startdate");
                                                const startDate = startdateInput ? startdateInput.value : "";

                                                const enddate = document.getElementById("enddate").value;
                                                const place = document.getElementById("place").value;
                                                const collaborateur = document.getElementById("collaborateur").value;
                                                const typeEvent = document.getElementById("typeEvent").addEventListener("change", function () {
                                                   alert("Vous avez sélectionné " + this.value);
                                                });
                                                const axes = Array.from(document.querySelectorAll('input[name="axes"]:checked')).map(e => e.value);
                                                if (!eventname || !startDate || !enddate || !place || !collaborateur || !typeEvent || !axes) {
                                                   Swal.showValidationMessage('Please fill in all fields');
                                                }

                                                const currentDate = new Date().toISOString().split('T')[0];
                                                if (!eventname || !startDate || !enddate || !place || !collaborateur || !typeEvent || !axes) {
                                                   Swal.showValidationMessage('Please fill in all fields');
                                                } else if (startDate < currentDate) {
                                                   Swal.showValidationMessage('Start date cannot be before current date');
                                                } else if (endDate < startDate) {
                                                   Swal.showValidationMessage('End date must be after start date');
                                                }
                                                return { eventname: eventname, startDate: startDate, enddate: enddate, place: place, collaborateur: collaborateur, typeEvent: typeEvent, axes: axes };
                                             }
                                          }).then(result => {
                                             if (result.isConfirmed) {
                                                console.log(result.value);
                                                const updateData = {
                                                   eventname: result.value.eventname,
                                                   startDate: result.value.startDate,
                                                   enddate: result.value.enddate,
                                                   place: result.value.place,
                                                   collaborateur: result.value.collaborateur,
                                                   typeEvent: result.value.typeEvent,
                                                   axes: result.value.axes
                                                }
                                                axios.put(`${process.env.REACT_APP_SERVER_URL}/Table-Event/event/updateEvent${event._id}`, updateData, {
                                                   headers: {
                                                      'Content-Type': 'application/json'
                                                   }
                                                }).then(response => {
                                                   if (response.status === 200) {
                                                      Swal.fire({
                                                         icon: 'success',
                                                         title: 'Event updated successfully',
                                                         showConfirmButton: false,
                                                         timer: 1500
                                                      }).then(() => {
                                                      });
                                                   } else {
                                                      Swal.fire({
                                                         icon: 'error',
                                                         title: 'Failed to update your event',
                                                      });
                                                   }
                                                }).catch(error => {
                                                   console.error(error);
                                                   Swal.fire({
                                                      icon: 'error',
                                                      title: 'Failed to update the event',
                                                   });
                                                });
                                             }
                                          })
                                       }
                                       }
                                          variant="primary" > Update Your Event</button>
                                       <Link to={`/client/table-apply?id=${event._id}`}>
                                          <button type="button" class="btn btn-outline-info btn-rounded">Apply</button>
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
                        pageCount={Math.ceil(events.length / 3)}
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
export default EventTable;