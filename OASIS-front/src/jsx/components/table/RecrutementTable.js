import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography , Button} from '@material-ui/core';
const RecrutementTable = () =>{
  const [candidatures, setCandidatures] = useState([]);
  const [candidatDetails, setCandidatDetails] = useState(null);
  const [search, setSearch] = useState("");
  const userr = JSON.parse(localStorage.getItem("connectedUser"));
  const afficherDetailsCandidat = (candidat) => {
    setCandidatDetails(candidat);
  };

  useEffect(() => {
    axios
       .get("http://localhost:3000/recrutements")
       .then((res) => {
        setCandidatures(res.data);
       })
       .catch((err) => {
          console.log(err);
       });

       
       search &&
       setCandidatures(candidatures.filter((candidature) => candidature.nom.includes(search)));
   }, [candidatures]);


/*
   const accepterCandidature = async (candidat) => {
    const subject = "Félicitations, vous êtes accepté(e) au club " + candidat.clubSouhaite;
    const text = "Cher/Chère " + candidat.nom + ",\n\n" +
                 "Nous sommes heureux de vous informer que votre candidature au club " + candidat.clubSouhaite + " a été acceptée.\n\n" +
                 "Bienvenue dans notre club et nous espérons que vous apprécierez votre temps avec nous.\n\n" +
                 "Cordialement,\n" +
                 "L'équipe du club " + candidat.clubSouhaite;
    
    await sendEmail(candidat.mail, subject, text);
  };
  */

  







  const accepterCandidature = async (candidat) => {
    try {
      const response = await fetch("http://localhost:3000/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: candidat.mail,
          subject: "Félicitations, vous êtes accepté(e) au club " + candidat.clubSouhaite,
          text:
            "Cher/Chère " +
            candidat.nom +
            ",\n\n" +
            "Nous sommes heureux de vous informer que votre candidature au club " +
            candidat.clubSouhaite +
            " a été acceptée.\n\n" +
            "Bienvenue dans notre club et nous espérons que vous apprécierez votre temps avec nous.\n\n" +
            "Cordialement,\n" +
            "L'équipe du club " +
            candidat.clubSouhaite
        })
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.log("Email not sent");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const refuserCandidature = async (candidat) => {
    const subject = "Refus de candidature";
    const text = `Bonjour ${candidat.nom},\n\nNous regrettons de vous informer que votre candidature pour rejoindre le club ${candidat.clubSouhaite} n'a pas été retenue.\n\nCordialement,\nL'équipe du club`;
  
    try {
      await axios.post('http://localhost:3000/sendMail', {
        email: candidat.mail,
        subject: subject,
        text: text
      });
      console.log("email sent successfully");
    } catch (error) {
      console.log(error, "email not sent");
    }
  };
  





   /*
  const refuserCandidature = async (email, clubSouhaite) => {
    const subject = "Votre candidature au club " + clubSouhaite + " a été refusée";
    const text = "Bonjour,\n\nNous regrettons de vous informer que votre candidature au club " + clubSouhaite + " a été refusée. Nous vous remercions toutefois de votre intérêt et nous vous encourageons à continuer à chercher des opportunités similaires.\n\nCordialement,\nL'équipe du club";
    const url = "http://localhost:3000/sendMail";
  
    try {
      await axios.post(url, { email, subject, text });
      console.log("Email envoyé avec succès à " + email);
    } catch (error) {
      console.log("Une erreur s'est produite lors de l'envoi de l'email: ", error);
    }
  };
  */  
   
/*
   const accepterCandidature = (candidature) => {
    axios.post(`http://localhost:3000/accepter/${candidature._id}`)
      .then(() => {
        sendMail(candidature.mail, `Félicitations, vous êtes accepté au club ${candidature.clubSouhaite} !`);
        setCandidatures(candidatures.filter((c) => c._id !== candidature._id));
        setCandidatDetails(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refuserCandidature = (candidature) => {
    axios.post(`http://localhost:3000/refuser/${candidature._id}`)
      .then(() => {
        sendMail(candidature.mail, `Votre candidature pour le club ${candidature.clubSouhaite} a été refusée.`);
        setCandidatures(candidatures.filter((c) => c._id !== candidature._id));
        setCandidatDetails(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

*/
  return (
<div>
      <Typography variant="h4" component="h1" gutterBottom>Liste des candidatures</Typography>
      <List>
        {candidatures.map(candidat => (
          <ListItem key={candidat._id} onClick={() => afficherDetailsCandidat(candidat)} button>
            <ListItemAvatar>
              <Avatar src={candidat.Image} />
            </ListItemAvatar>
            <ListItemText primary={candidat.nom} secondary={candidat.departement} />
            <Button color="primary" onClick={(e) => {
              e.stopPropagation();
              accepterCandidature(candidat);
            }}>Accepter</Button>
            <Button color="secondary" onClick={(e) => {
              e.stopPropagation();
              refuserCandidature(candidat);
            }}>Refuser</Button>
          </ListItem>
        ))}
      </List>
      {candidatDetails && (
        <div>
          <Typography variant="h5" component="h2" gutterBottom>{candidatDetails.nom}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Mail :</strong> {candidatDetails.mail}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Département :</strong> {candidatDetails.departement}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Club souhaité :</strong> {candidatDetails.clubSouhaite}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Niveau d'expérience :</strong> {candidatDetails.niveauExperience}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Compétences :</strong> {candidatDetails.competences}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Date de candidature :</strong> {candidatDetails.dateCandidature}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Date d'entretien :</strong> {candidatDetails.dateEntretien}</Typography>
        </div>
      )}
    </div>


    );
}

export default RecrutementTable;