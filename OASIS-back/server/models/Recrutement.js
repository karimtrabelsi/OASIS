const mongoose = require("mongoose");


const clubSouhaite = {
  Rotary: "Rotary",
  Rotaract: "Rotaract",
  Interact: "Interact",
  Lions: "Lions",
  Leo: "Leo",
};


const recrutementSchema = new mongoose.Schema({
  nom: { type: String,
    required: true,
      },
  mail:{ type: String,
    required: true,
      },
  image: { type: String,
      },
  departement: { type: String,
    required: true,
      },
  clubSouhaite: {
    type: String,
    required: true,
    enum: Object.values(clubSouhaite),
  },
  niveauExperience: { type: String,
    required: true,
      },
  competences: { type: String,
    required: true,
      },
  dateCandidature: { type: String,
    required: true,
      },
  dateEntretien:{ type: Date,
    required: true,
  }
  })

  const Recrutement = mongoose.model('Recrutement', recrutementSchema);

  module.exports = Recrutement;

  