import React, { useState } from "react";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  FormLabel,
  FormControl,
} from "react-bootstrap";

function Recrutement() {
  const [nom, setNom] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");
  const [departement, setDepartement] = useState("");
  const [clubSouhaite, setClubSouhaite] = useState("");
  const [niveauExperience, setNiveauExperience] = useState("");
  const [competences, setCompetences] = useState("");
  const dateCandidature = new Date().toLocaleDateString();
  const [dateEntretien, setDateEntretien] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/recrutements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom,
        mail,
        image,
        departement,
        clubSouhaite,
        niveauExperience,
        competences,
        dateCandidature,
        dateEntretien,
      }),
    });
    const data = await response.json();
  };

  return (
    <Container>
      <Card className="my-4">
        <Card.Header>
          <h3>Formulaire de recrutement</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormLabel>Nom complet du candidat</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Nom complet"
                  value={nom}
                  onChange={(event) => setNom(event.target.value)}
                  required
                />
              </Col>
              <Col md={6}>
                <FormLabel>Adresse e-mail du candidat</FormLabel>
                <FormControl
                  type="email"
                  placeholder="Adresse e-mail"
                  value={mail}
                  onChange={(event) => setMail(event.target.value)}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormLabel>Photo ou image du candidat</FormLabel>
                <FormControl
                  type="text"
                  placeholder="URL de l'image"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  required
                />
              </Col>
              <Col md={6}>
                <FormLabel>Département ou équipe</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Département ou équipe"
                  value={departement}
                  onChange={(event) => setDepartement(event.target.value)}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormLabel>Club souhaité</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Club souhaité"
                  value={clubSouhaite}
                  onChange={(event) => setClubSouhaite(event.target.value)}
                  required
                />
              </Col>
              <Col md={6}>
                <FormLabel>Niveau d'expérience requis</FormLabel>
                <FormControl
                  type="text"
                  placeholder="niveau d'experience"
                  value={niveauExperience}
                  onChange={(event) =>
                    setNiveauExperience(event.target.value)
                  }
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormLabel>Compétences nécessaires</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Compétences nécessaires"
                  value={competences}
                  onChange={(event) => setCompetences(event.target.value)}
                  required
                />
              </Col>
             
            </Row>
            <Row>
            <Col md={6}>
                <FormLabel>Date d'entretien souhaitée</FormLabel>
                <FormControl
                  type="date"
                  placeholder="Date d'entretien souhaitée"
                  value={dateEntretien}
                  onChange={(event) => setDateEntretien(event.target.value)}
                  required
                />
              </Col>
            <Col md={6}>
            <FormLabel>Date de candidature</FormLabel>
            <p>{dateCandidature}</p>
          </Col>
             
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Envoyer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Recrutement;





















/*import React, { useState } from "react";
import axios from "axios";

const Recrutement = () => {
  const [nom, setNom] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");
  const [departement, setDepartement] = useState("");
  const [clubSouhaite, setClubSouhaite] = useState("");
  const [niveauExperience, setNiveauExperience] = useState("");
  const [competences, setCompetences] = useState("");
  const [dateCandidature, setDateCandidature] = useState("");
  const [dateEntretien, setDateEntretien] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const recrutement = {
      nom,
      mail,
      image,
      departement,
      clubSouhaite,
      niveauExperience,
      competences,
      dateCandidature,
      dateEntretien
    };
    try {
      await axios.post("http://localhost:3000/recrutements", recrutement);
      alert("Recrutement ajouté avec succès");
    } catch (error) {
      alert("Erreur lors de l'ajout du recrutement");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom :
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      </label>
      <br />
      <label>
        Mail :
        <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
      </label>
      <br />
      <label>
        Image :
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <br />
      <label>
        Département :
        <input type="text" value={departement} onChange={(e) => setDepartement(e.target.value)} />
      </label>
      <br />
      <label>
        Club souhaité :
        <input type="text" value={clubSouhaite} onChange={(e) => setClubSouhaite(e.target.value)} />
      </label>
      <br />
      <label>
        Niveau d'expérience :
        <input type="text" value={niveauExperience} onChange={(e) => setNiveauExperience(e.target.value)} />
      </label>
      <br />
      <label>
        Compétences :
        <input type="text" value={competences} onChange={(e) => setCompetences(e.target.value)} />
      </label>
      <br />
      <label>
        Date de candidature :
        <input type="text" value={dateCandidature} onChange={(e) => setDateCandidature(e.target.value)} />
      </label>
      <br />
      <label>
        Date entretien :
        <input type="text" value={dateEntretien} onChange={(e) => setDateEntretien(e.target.value)} />
      </label>
      <br />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default Recrutement;
*/