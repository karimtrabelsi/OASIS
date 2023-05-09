import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography , Button} from '@material-ui/core';
import useAuthStore from "../../../utils/zustand"
const RecrutementTable = () =>{
  const [candidatures, setCandidatures] = useState([]);
  const [candidatDetails, setCandidatDetails] = useState(null);
  const [search, setSearch] = useState("");
  const userr = JSON.parse(localStorage.getItem("connectedUser"));
  const {user} = useAuthStore();

  const afficherDetailsCandidat = (candidat) => {
    setCandidatDetails(candidat);
  };

  useEffect(() => {
    axios
       .get(`${process.env.REACT_APP_SERVER_URL}/recrutements`)
       .then((res) => {
        setCandidatures(res.data);
       })
       .catch((err) => {
          console.log(err);
       });

       
       
       setCandidatures(candidatures.filter((candidature) => candidature.clubSouhaite.includes(JSON.parse(user).club)));
   }, []);



  







  const accepterCandidature = async (candidat) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/recrutements/accept`, {
        email: candidat.mail,
        subject: "Félicitations, vous êtes accepté(e) au club " + candidat.clubSouhaite,
        text: "Cher/Chère " +
        candidat.nom +
        ",\n\n" +
        "Nous sommes heureux de vous informer que votre candidature au club " +
        candidat.clubSouhaite +
        " a été acceptée.\n\n" +
        "Bienvenue dans notre club et nous espérons que vous apprécierez votre temps avec nous.\n\n" +
        "Cordialement,\n" +
        "L'équipe du club " +
        candidat.clubSouhaite
      });
      console.log("email sent successfully");
    } catch (error) {
      console.log(error, "email not sent");
    }
  };


  const refuserCandidature = async (candidat) => {
    const subject = "Refus de candidature";
    const text = `Bonjour ${candidat.nom},\n\nNous regrettons de vous informer que votre candidature pour rejoindre le club ${candidat.clubSouhaite} n'a pas été retenue.\n\nCordialement,\nL'équipe du club`;
  
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/recrutements/accept`, {
        email: candidat.mail,
        subject: subject,
        text: text
      });
      console.log("email sent successfully");
    } catch (error) {
      console.log(error, "email not sent");
    }
  };
  





   


  return (
<div>
      <Typography variant="h4" component="h1" gutterBottom>Recruitment List</Typography>
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
            }}>Accept</Button>
            <Button color="secondary" onClick={(e) => {
              e.stopPropagation();
              refuserCandidature(candidat);
            }}>Decline</Button>
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