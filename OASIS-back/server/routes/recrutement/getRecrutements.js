const Recrutement = require('../../models/Recrutement');

const getRecrutements = async (req, res) => {
  try {
    const recrutements = await Recrutement.find();
    res.status(200).json(recrutements);
  } catch (err) {
    console.error(err);
    res.status(500).send('Une erreur est survenue lors de la récupération des recrutements.');
  }
};

module.exports = getRecrutements;
