const Recrutement = require('../../models/Recrutement');

const createRecrutement = async (req, res) => {
  try {
    const recrutement = new Recrutement(req.body);
    await recrutement.save();
    res.status(201).json(recrutement);
  } catch (err) {
    console.error(err);
    res.status(500).send('Une erreur est survenue lors de la création du recrutement.');
  }
};

module.exports = createRecrutement;

