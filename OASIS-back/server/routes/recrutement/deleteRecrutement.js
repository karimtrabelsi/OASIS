const Recrutement = require('../../models/Recrutement');

const deleteRecrutement = async (req, res) => {
  try {
    const { id } = req.params;
    await Recrutement.findByIdAndDelete(id);
    res.status(200).send('Le recrutement a été supprimé avec succès.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Une erreur est survenue lors de la suppression du recrutement.');
  }
};

module.exports = deleteRecrutement;
