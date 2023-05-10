/*const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/oasisdb')

const clubSouhaite = {
    Rotary: "Rotary",
    Rotaract: "Rotaract",
    Interact: "Interact",
    Lions: "Lions",
    Leo: "Leo",
  };

// Define the schema for the Recrutement entity
const recrutementSchema = new mongoose.Schema({
    idR: { type: Number,
        required: true,
          },
  nom: { type: String,
    required: true,
      },
  mail:{ type: String,
    required: true,
      },
  image: { type: String,
    required: true,
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
  dateCandidature: { type: Date,
    required: true,
      },
  dateEntretien:{ type: Date,
    required: true,
  }
});

// Define the model for the Recrutement entity
const Recrutement = mongoose.model('Recrutement', RecrutementSchema);

//verif
Recrutement.createCollection()
  .then(() => {
    console.log('La collection Recrutement a été créée avec succès');
  })
  .catch((err) => {
    console.error('Erreur lors de la création de la collection Recrutement', err);
  });


// Create a new Recrutement entity
app.post('/recrutements', (req, res) => {
  const recrutement = new Recrutement(req.body);

  recrutement.save((err, savedRecrutement) => {
    if (err) {
      res.status(500).send({ error: 'Could not create new recrutement entity' });
    } else {
      res.send(savedRecrutement);
    }
  });
});

// Retrieve all Recrutement entities
app.get('/recrutements', (req, res) => {
  Recrutement.find({}, (err, recrutements) => {
    if (err) {
      res.status(500).send({ error: 'Could not retrieve recrutements' });
    } else {
      res.send(recrutements);
    }
  });
});

// Retrieve a single Recrutement entity
app.get('/recrutements/:id', (req, res) => {
  Recrutement.findById(req.params.id, (err, recrutement) => {
    if (err) {
      res.status(500).send({ error: 'Could not retrieve recrutement' });
    } else if (!recrutement) {
      res.status(404).send({ error: `Recrutement with id ${req.params.id} not found` });
    } else {
      res.send(recrutement);
    }
  });
});

// Update a Recrutement entity
app.put('/recrutements/:id', (req, res) => {
  Recrutement.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, recrutement) => {
    if (err) {
      res.status(500).send({ error: 'Could not update recrutement' });
    } else if (!recrutement) {
      res.status(404).send({ error: `Recrutement with id ${req.params.id} not found` });
    } else {
      res.send(recrutement);
    }
  });
});

// Delete a Recrutement entity
app.delete('/recrutements/:id', (req, res) => {
  Recrutement.findByIdAndDelete(req.params.id, (err, recrutement) => {
    if (err) {
      res.status(500).send({ error: 'Could not delete recrutement' });
    } else if (!recrutement) {
      res.status(404).send({ error: `Recrutement with id ${req.params.id} not found` });
    } else {
        res.send(`Recrutement with id ${req.params.id} deleted`);
      }
    });
});      

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    });


    */