const Recrutement = require('../../models/Recrutement');

const getRecrutement = async (req, res) => {
  try {
    const { id } = req.params;
    const recrutement = await Recrutement.findById(id);
    res.status(200).json(recrutement);
  } catch (err) {
    console.error(err);
    res.status(500).send('Une erreur est survenue lors de la récupération du recrutement.');
  }
};

module.exports = getRecrutement;
