import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Card, CardDeck, Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import swal from "sweetalert";
import avatar3 from "../../../images/avatar/3.jpg";


const FeesCollection = () => {
const [events, setEvents] = useState([]);
const [userr, setUserr] = useState({});


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
<Row>
<Col>
<Card>
<Card.Header>
<h4>Liste des événements</h4>
</Card.Header>
<Card.Body>
{events

.reduce((accumulator, event, index) => {
if (index % 3 === 0) {
accumulator.push([]);
}
accumulator[accumulator.length - 1].push(
<Card key={event._id} className="my-3">
<Card.Header>
<h5>{event.eventname}</h5>
</Card.Header>
<Card.Img variant="top" src={avatar3} />
<Card.Body>
<Card.Title>Place : {event.place}</Card.Title>
<Card.Text>Type d'événement : {event.typeEvent}</Card.Text>
<Card.Text>Axe : {event.axes}</Card.Text>
<Card.Text>Date de début : {moment(event.startdate).format('MM/DD/YYYY')}</Card.Text>
<Card.Text>Date de fin : {moment(event.enddate).format('MM/DD/YYYY')}</Card.Text>
<Card.Text>Collaborateur : {event.collaborateur}</Card.Text>
<Card.Text>Cotisation : {event.cotisation}</Card.Text>
<Button variant="primary">Détails</Button>
<Button
onClick={() =>
swal({
title: "Êtes-vous sûr?",
text: "Une fois supprimé, l'événement ne sera plus disponible !",
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
if (res.status === 200) {
swal(
event.eventname + " supprimé !",
{
icon: "success",
}
);
} else {
swal("Erreur de connexion !");
}
})
.catch((err) => {
console.log(err);
});
} else {
swal("Rien n'a changé !");
}
})
}
variant="primary"
>
Supprimer
</Button>
</Card.Body>
</Card>
);
return accumulator;
}, [])
.map((cardDeck, index) => (
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