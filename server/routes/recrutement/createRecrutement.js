const Recrutement = require('../../models/Recrutement');
const nodemailer = require('nodemailer');

const createRecrutement = async (req, res) => {
  try {
    const recrutement = new Recrutement(req.body);
    await recrutement.save();
    res.status(201).json(recrutement);
    sendEmailAfterRecrutementCreation(recrutement);
  } catch (err) {
    console.error(err);
    res.status(500).send('Une erreur est survenue lors de la création du recrutement.');
  }
};

const sendEmailAfterRecrutementCreation = async (recrutement) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'testahmedahmed210@gmail.com',
        pass: 'rrvhansvnylaxsux'
      }
    });

    const mailOptions = {
      from: 'testahmedahmed210@gmail.com',
      to: recrutement.mail,
      subject: 'Entretien de recrutement',
      text: `Bonjour ${recrutement.nom}, nous avons bien reçu votre candidature et nous sommes heureux de vous informer que votre entretien de recrutement est prévu le ${recrutement.dateEntretien}. Nous vous recontacterons prochainement pour vous donner plus de détails sur l'entretien.`
    };


// Envoi de l'email
const info = await transporter.sendMail(mailOptions);
console.log(`Message sent: ${info.messageId}`);
} catch (error) {
console.error(error);
throw new Error("Une erreur s'est produite lors de l'envoi de l'e-mail.");
}





  
};

module.exports = createRecrutement;