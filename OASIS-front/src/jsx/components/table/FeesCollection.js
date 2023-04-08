import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Card, CardDeck, Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import avatar3 from "../../../images/avatar/3.jpg";
import swal from "sweetalert";
import Swal from "sweetalert2";
import swalMessage from "@sweetalert/with-react";
import PageTitle from "../../layouts/PageTitle";




const FeesCollection = () => {
const [events, setEvents] = useState([]);
const [search, setSearch] = useState("");
//const [userr, setUserr] = useState({});
const setUserr = JSON.parse(localStorage.getItem("connectedUser"));
   useEffect(() => {
      axios
         .get("http://localhost:3000/Event-Table")
         .then((res) => {
            setEvents(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
      search && setEvents(events.filter((event) => event.eventname.includes(search)));
   }, [events]);


useEffect(() => {
const fetchData = async () => {
const result = await axios("http://localhost:3000/getEvent");
setEvents(result.data);
setUserr({ axes: "some_axes" }); // Remplacez "some_axes" par l'axe de l'utilisateur
};
fetchData();
}, []);

return (
<Fragment>
    <PageTitle activeMenu="Table" motherMenu="Bootstrap" />
    <Row>
        <Col  lg={12}>
            <Card>
                <Card.Header>
                    <Card.Title>Events list</Card.Title>
                    <Button onClick={() => Swal.fire({
                                       title: 'Enter your Event details',
                                       html: '<input type="text" id="eventname" class="swal2-input" placeholder="eventname">' +
                                      
                                       '<input type="date" id="startDate" class="swal2-input" placeholder="startdate">' +
                                       
                                       '<input type="date" id="enddate" class="swal2-input" placeholder="enddate">' +
                                       '<input type="text" id="place" class="swal2-input" placeholder="place">' +
                                       '<input type="text" id="collaborateur" class="swal2-input" placeholder="collaborateur">' +
                                       '<div class="swal2-input">' +
                                       '<label for="typeEvent" >Event Type :</label>'+
                                       '<select id="typeEvent" name="typeEvent">'+
                                       '<option value="charityevent">Charity Event</option>' +
                                       '<option value="teambuilding">Team Building</option>'+
                                       '<option value="protraining">Pro Training</option>'+
                                       '</select>'+
                                       '</div>' +
                                       '<div class="swal2-input">' +
                                       '<label for="axes">Global Causes:</label>'+
                                       '<select id="axes" name="axes">'+
                                       '<option value="diabetes">Diabetes</option>' +
                                       '<option value="vision">Vision</option>'+
                                       '<option value="hunger">Hunger</option>'+
                                       '<option value="environment">Environment</option>'+
                                       '<option value="childhoodcancer">Childhood Cancer</option>'+
                                       '</select>'+
                                       '</div>' ,
                                       showCancelButton: true,
                                       confirmButtonText: 'Submit'
                                    }).then((result) => {
                                       if (result.isConfirmed) {
                                          // Handle form submission here
                                          const eventname = document.getElementById("eventname").value;
                                          const startdate = document.getElementById("startdate").value;
                                          const enddate = document.getElementById("enddate").value;
                                          const place = document.getElementById("place").value;
                                          const collaborateur = document.getElementById("collaborateur").value;
                                          const typeEvent =document.getElementById("typeEvent").addEventListener("change", function() {
                                            alert("Vous avez sélectionné " + this.value);
                                          });
                                          const axes = Array.from(document.querySelectorAll('input[name="axes"]:checked')).map(e => e.value);
                                          console.log("Event Name:", eventname);
                                          console.log("Start Date:", startdate);
                                          console.log("End Date:", enddate);
                                          console.log("Place:", place);
                                          console.log("Collaborateur:", collaborateur);
                                          console.log("Type Event:", typeEvent);
                                          console.log("Axes:", axes);
                                          Swal.fire({
                                             title: 'Form submitted',
                                             text: 'Thank you for submitting the form.',
                                             icon: 'success'
                                          });
                                       }
                                    })
                                 }
                     variant="primary">Add Event</Button>
                    </Card.Header>
            <Card.Body>
                {events.reduce((accumulator, event, index) => {
                    if (index % 3 === 0) {
                        accumulator.push([]);}
                        accumulator[accumulator.length - 1].push(
                        <Card key={event._id} className="my-3">
                            <Card.Header>
                                <h5>{event.eventname}</h5>
                            </Card.Header>
                            <Card.Img variant="top" src={avatar3} />
                            <Card.Body>
                                <Card.Text>Place : {event.place}</Card.Text>
                                <Card.Text>Event Type : {event.typeEvent}</Card.Text>
                                <Card.Text>Axe : {event.axes}</Card.Text>
                                <Card.Text>Start date : {moment(event.startdate).format('MM/DD/YYYY')}</Card.Text>
                                <Card.Text>End date : {moment(event.enddate).format('MM/DD/YYYY')}</Card.Text>
                                <Card.Text>Collaborater : {event.collaborateur}</Card.Text>
                                <Card.Text>Contribution : {event.cotisation}</Card.Text>
                                <Button variant="primary">Details</Button>
                                <Button onClick={() =>
                                swal({
                                    title: "Are you sure?",
                                    text: "Once deleted, the event will no longer be available!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                }).then((willDelete) => {
                                    if (willDelete) {
                                        axios
                                        .delete(
                                            "http://localhost:3000/event/deleteEvent/" +
                                            event._id
                                        )
                                        .then((res) => {
                                            // console.log(res)
                                            if ((res.status === 200)) {
                                                swal(
                                                    event.eventname + " deleted !",
                                                    {
                                                        icon: "success",
                                                    }
                                                );
                                            } else {
                                                swal("Connexion error!");
                                            }
                                        })
                                            .catch((err) => {
                                                console.log(err);
                                            });
                                        } else {
                                            swal("Nothing has changed!");
                                        }
                                    })
                                }
                                    variant="primary">Delete</Button>
                            </Card.Body>
                        </Card>
                        );
                        return accumulator;
                    }, []).map((cardDeck, index) => (
                    <CardDeck key={index}>{cardDeck}</CardDeck>
                    ))}
                    </Card.Body>
                    </Card>
                    </Col>
                    </Row>
                    </Fragment>
                    );
                };

export default FeesCollection;