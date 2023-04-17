const Recrutement = require('../../models/Recrutement');

const updateRecrutement = async (req, res) => {
  try {
    const { id } = req.params;
    const recrutement = await Recrutement.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(recrutement);
  } catch (err) {
    console.error(err);
    res.status(500).send('Une erreur est survenue lors de la mise à jour du recrutement.');
  }
};

module.exports = updateRecrutement;
