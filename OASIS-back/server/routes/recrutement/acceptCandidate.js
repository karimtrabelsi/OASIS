const Recrutement = require('../../models/Recrutement');
const sendMail = require('../../utils/sendMail');
const acceptCandidate = async (req, res) => {
  try {
    const { email, subject, text } = req.body;
    sendMail(email, subject, text)
    res.status(200).json({"message": "Mail sent successfully!"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Une erreur est survenue lors de la mise à jour du recrutement.');
  }
};

module.exports = acceptCandidate;
