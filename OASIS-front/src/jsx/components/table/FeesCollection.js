import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Card, CardDeck, Table, Badge, Dropdown, ProgressBar, Button, } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import swalMessage from "@sweetalert/with-react";
import PageTitle from "../../layouts/PageTitle";
import ReactStars from "react-rating-stars-component";
import useAuthStore from "../../../utils/zustand";
import ReactPaginate from 'react-paginate';



/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";

const FeesCollection = () => {
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
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(currentPage * 3, currentPage * 3 + 3);

  // Determine if the logged-in user has the role "Member"
  const isMember = user && JSON.parse(user).role === "Member";

  //const [userr, setUserr] = useState({});
  const setUserr = JSON.parse(localStorage.getItem("connectedUser"));
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getEvent`)
      .then(async (res) => {
        await setEvents(res.data);
        search && setEvents(events.filter((event) => event.eventname.includes(search)));

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${process.env.REACT_APP_SERVER_URL}/getEvent`);
      setEvents(result.data);
      // setUserr({ axes: "some_axes" }); // Remplacez "some_axes" par l'axe de l'utilisateur
    };
    fetchData();
  }, []);

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

  //     // On crée une constante qui va contenir le tableau des événements filtrés
  //     const filteredEvents = events.filter(event => {
  //     // On vérifie si le nom de l'événement contient le terme de recherche (en ignorants les majuscules et minuscules)
  //     const eventnameMatch = event.eventname.toLowerCase().includes(searchTerm.toLowerCase());
  //     // On vérifie si le lieu de l'événement contient le terme de recherche (en ignorants les majuscules et minuscules)
  //     const placeMatch = event.place.toLowerCase().includes(searchTerm.toLowerCase());
  //     const searchTerm = document.getElementById('search').value;
  //     // On retourne l'événement si au moins l'un des deux critères est vérifié
  //     return eventnameMatch || placeMatch;
  //   });
  //      // On crée une fonction qui va ajouter un événement à la base de données
  // const addEvent = (event) => {
  //     // On envoie une requête POST à l'API pour ajouter l'événement
  //     axios.post('http://localhost:3001/addEvent', event, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }).then(response => {
  //       // Si la requête a réussi, on affiche un message de succès
  //       if (response.status === 200) {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Event added successfully',
  //           showConfirmButton: false,
  //           timer: 1500
  //         }).then(() => {
  //           // On recharge la page pour afficher l'événement ajouté
  //           window.location.reload();
  //         });
  //       } else {
  //         // Si la requête a échoué, on affiche un message d'erreur
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Failed to add your event',
  //         });
  //       }
  //     }).catch(error => {
  //       // Si une erreur s'est produite lors de la requête, on affiche un message d'erreur
  //       console.error(error);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Failed to add your event',
  //       });
  //     });
  //   };

  return (
    <Fragment>
      <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>Events list</Card.Title>

              <div className="input-group search-area mr-5">
                <div className="d-flex justify-content-md-around align-self-center ">
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
              {!isMember && (<button type="button" class="btn btn-info btn-rounded"
                onClick={() => Swal.fire({
                  title: 'Enter your Event details',
                  html:
                    '<div class="input_wrap">' +
                    '<input type="file" id="image" class="form-control" >' +
                    ' <label>Image</label>' +
                    '<div/>' +
                    '<input type="text" id="eventname" class="swal2-input" placeholder="eventname">' +
                    '<input type="date" id="startDate" class="swal2-input" placeholder="startdate">' +
                    '<input type="date" id="enddate" class="swal2-input" placeholder="enddate">' +
                    '<input type="text" id="place" class="swal2-input" placeholder="place">' +
                    '<input type="text" id="collaborateur" class="swal2-input" placeholder="collaborateur">' +
                    '<input type="text" id="cotisation" class="swal2-input" placeholder="cotisation">' +
                    '<br></br>' +
                    '<div class="select_wrap">' +
                    '<select id="typeEvent" name="typeEvent">' +
                    ' <option value="">Select a Type</option>' +
                    '<option value="CharityEvent">Charity Event</option>' +
                    '<option value="TeamBuilding">Team Building</option>' +
                    '<option value="ProTraining">Pro Training</option>' +
                    '</select>' +
                    '</div>' +
                    '<br/>' +
                    '<div class="select_wrap">' +
                    '<select id="axes" name="axes">' +
                    ' <option value="">Select a global cause</option>' +
                    '<option value="Diabetes">Diabetes</option>' +
                    '<option value="Vision">Vision</option>' +
                    '<option value="Hunger">Hunger</option>' +
                    '<option value="Environment">Environment</option>' +
                    '<option value="ChildhoodCancer">ChildhoodCancer</option>' +
                    '</select>' +
                    '</div>',
                  showCancelButton: true,
                  focusConfirm: false,
                  confirmButtonText: 'Submit',
                  preConfirm: () => {
                    const file = document.getElementById("image").files[0];
                    const eventname = document.getElementById("eventname").value;
                    const startdateInput = document.querySelector("#startDate");
                    const startdate = startdateInput ? startdateInput.value : "";
                    const enddate = document.getElementById("enddate").value;
                    const place = document.getElementById("place").value;
                    const collaborateur = document.getElementById("collaborateur").value;
                    const cotisation = document.getElementById("cotisation").value;
                    const typeEvent = document.getElementById("typeEvent").value; // récupérer la valeur de l'option sélectionnée
                    const axes = document.getElementById("axes").value;
                    const currentDate = new Date().toISOString().split('T')[0];
                    if (startDate < currentDate) {
                      Swal.showValidationMessage('Start date cannot be before current date');
                    } else if (endDate <= startDate) {
                      Swal.showValidationMessage('End date must be after start date');
                    }
                    //  if (!eventname || !startDate || !enddate || !place || !collaborateur || !typeEvent || !axes) {
                    //     Swal.showValidationMessage('Please fill in all fields');
                    const formData = new FormData();
                    console.log('here')
                    formData.append('file', file)
                    formData.append('eventname', eventname)
                    formData.append('startDate', startdate)
                    formData.append('enddate', enddate)
                    formData.append('place', place)
                    formData.append('collaborateur', collaborateur)
                    formData.append('cotisation', cotisation)
                    formData.append('typeEvent', typeEvent)
                    formData.append('axes', axes)

                    for (const value of formData.values()) {
                      console.log(value);
                    }

                    axios.post(`${process.env.REACT_APP_SERVER_URL}/event`, formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    }).then(response => {
                      Swal.fire({
                        icon: 'success',
                        title: 'Your Event added successfully',
                        showConfirmButton: false,
                        timer: 1500
                      });
                    }).catch(error => {
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
                variant="primary">
                <span class="btn-icon-left text-info"><i class="fa fa-plus color-info"></i></span>Add Event</button>
              )}




            </Card.Header>
            <Card.Body>
              {currentItems.reduce((accumulator, event, index) => {
                if (index % 3 === 0) {
                  accumulator.push([]);
                }
                accumulator[accumulator.length - 1].push(
                  <Card key={event._id} className="my-3">
                    <Card.Header>
                      <h5>{event.eventname}</h5>
                      <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                    </Card.Header>
                    <Card.Img variant="top" src={require("../../../images/events/" + event.image)} />
                    <Card.Body>
                      {/* <Card.Text>Place: {event.place}</Card.Text>
          <Card.Text>Event Type: {event.typeEvent}</Card.Text>
          <Card.Text>Axe: {event.axes}</Card.Text>
          <Card.Text>Start date: {moment(event.startdate).format('MM/DD/YYYY')}</Card.Text>
          <Card.Text>End date: {moment(event.enddate).format('MM/DD/YYYY')}</Card.Text>
          <Card.Text>Collaborator: {event.collaborateur}</Card.Text>
          <Card.Text>Contribution: {event.cotisation}</Card.Text> */}
                      <div>
                        < div className="d-flex justify-content-center">
                          <button variant="primary" className="btn btn-outline-primary btn-rounded" onClick={() => {
                            Swal.fire({
                              title: 'Event Details',
                              html: `
      <p><strong>Place:</strong> ${event.place}</p>
      <p><strong>Event Type:</strong> ${event.typeEvent}</p>
      <p><strong>Axe:</strong> ${event.axes}</p>
      <p><strong>Start Date:</strong> ${moment(event.startdate).format('MM/DD/YYYY')}</p>
      <p><strong>End Date:</strong> ${moment(event.enddate).format('MM/DD/YYYY')}</p>
      <p><strong>Collaborator:</strong> ${event.collaborateur}</p>
      <p><strong>Contribution:</strong> ${event.cotisation}</p>
    `,
                              showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                              },
                              hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                              }
                            });
                          }}>
                            {showDetails[event._id] ? 'Hide Details' : ' Details'}

                          </button>

                          {!isMember && (<button
                            variant="primary"
                            className="btn btn-outline-danger btn-rounded"
                            onClick={() => {
                              swal({
                                title: "Are you sure?",
                                text: "Once deleted, the event will no longer be available!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  axios.delete(`${process.env.REACT_APP_SERVER_URL}/deletEvent/` + event._id) // fixed typo
                                    .then((res) => {
                                      if (res.status === 200) {
                                        swal(event.eventname + " deleted!", { icon: "success" });
                                      }
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                } else {
                                  swal("Nothing has changed!");
                                }
                              });
                            }}
                          >
                            <i className="fa fa-close"></i>
                          </button>
                          )}

                          {!isMember && (<button type="button" variant="primary" className="btn btn-outline-primary btn-rounded"
                            onClick={() => Swal.fire({
                              title: 'Enter your Event details',
                              html:
                                //'<input type="file" id="image" class="swal2-input" placeholder="image">' +
                                '<input type="text" id="eventname" class="swal2-input" placeholder="eventname"  value="' + event.eventname + '">' +
                                '<input type="date" id="startDate" class="swal2-input" placeholder="startdate" value="' + moment(event.startDate).format('YYYY-MM-DD') + '" >' +
                                '<input type="date" id="enddate" class="swal2-input" placeholder="enddate" value="' + moment(event.endDate).format('YYYY-MM-DD') + '">' +
                                '<input type="text" id="place" class="swal2-input" placeholder="place" value="' + event.place + '">' +
                                '<input type="text" id="collaborateur" class="swal2-input" placeholder="collaborateur" value="' + event.collaborateur + '">' +
                                '<input type="text" id="cotisation" class="swal2-input" placeholder="cotisation" value="' + event.cotisation + '">' +
                                '<div class="select_wrap">' +
                                '<select id="typeEvent" name="typeEvent">' +
                                ' <option value="">Select a Type</option>' +
                                '<option value="CharityEvent">Charity Event</option>' +
                                '<option value="TeamBuilding">Team Building</option>' +
                                '<option value="ProTraining">Pro Training</option>' +
                                '</select>' +
                                '</div>' +
                                '<div class="select_wrap">' +
                                '</br>'+
                                '<select id="axes" name="axes">' +
                                ' <option value="">Select a global cause</option>' +
                                '<option value="Diabetes">Diabetes</option>' +
                                '<option value="Vision">Vision</option>' +
                                '<option value="Hunger">Hunger</option>' +
                                '<option value="Environment">Environment</option>' +
                                '<option value="ChildhoodCancer">ChildhoodCancer</option>' +
                                '</select>' +
                                '</div>',
                              //showCancelButton: true,
                              focusConfirm: false,
                              //confirmButtonText: 'Submit',
                              preConfirm: () => {
                                // const file = document.getElementById("image").files[0];
                                // console.log(file)
                                const eventname = document.getElementById("eventname").value;
                                const startdateInput = document.querySelector("#startDate");
                                const startdate = startdateInput ? startdateInput.value : "";
                                const enddate = document.getElementById("enddate").value;
                                const place = document.getElementById("place").value;
                                const collaborateur = document.getElementById("collaborateur").value;
                                const cotisation = document.getElementById("cotisation").value;
                                const typeEvent = document.getElementById("typeEvent").value; // récupérer la valeur de l'option sélectionnée
                                const axes = document.getElementById("axes").value;
                                const currentDate = new Date().toISOString().split('T')[0];
                                if (startDate < currentDate) {
                                  Swal.showValidationMessage('Start date cannot be before current date');
                                } else if (endDate < startDate) {
                                  Swal.showValidationMessage('End date must be after start date');
                                }
                                //  if (!eventname || !startDate || !enddate || !place || !collaborateur || !typeEvent || !axes) {
                                //     Swal.showValidationMessage('Please fill in all fields');
                                return { eventname: eventname, startdate: startdate, enddate: enddate, place: place, collaborateur: collaborateur, cotisation: cotisation, typeEvent: typeEvent, axes: axes };
                              }
                            }).then(result => {
                              if (result.isConfirmed) {
                                const updateData = {
                                  eventname: result.value.eventname,
                                  startdate: result.value.startdate,
                                  enddate: result.value.enddate,
                                  place: result.value.place,
                                  collaborateur: result.value.collaborateur,
                                  cotisation: result.value.cotisation,
                                  typeEvent: result.value.typeEvent,
                                  axes: result.value.axes
                                }
                                // for (const value of formData.values()) {
                                //   console.log(value);
                                // }
                                axios.put(`${process.env.REACT_APP_SERVER_URL}/updateEvent/${event._id}`, updateData, {
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
                                      title: 'Failed to update Event',
                                    });
                                  }
                                }).catch(error => {
                                  console.error('There was an error adding your Event:', error);
                                  Swal.fire({
                                    icon: 'error',
                                  });
                                });
                              }
                            })
                            }
                          >Update</button>
                          )}
                        </div>




                      </div>
                      {showDetails[event._id] && (
                        <div>
                          <Card.Text>Place: {event.place}</Card.Text>
                          <Card.Text>Event Type: {event.typeEvent}</Card.Text>
                          <Card.Text>Axe: {event.axes}</Card.Text>
                          <Card.Text>Start date: {moment(event.startdate).format('MM/DD/YYYY')}</Card.Text>
                          <Card.Text>End date: {moment(event.enddate).format('MM/DD/YYYY')}</Card.Text>
                          <Card.Text>Collaborator: {event.collaborateur}</Card.Text>
                          <Card.Text>Contribution: {event.cotisation}</Card.Text>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                );
                return accumulator;
              }, []).map((cardDeck, index) => (
                <CardDeck key={index}>{cardDeck}</CardDeck>
              ))}
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
      </Row>
    </Fragment>
  );
};

export default FeesCollection;