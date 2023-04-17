const mongoose = require('mongoose');
const User = require('./user');
const Candidacy = require('./candidacy');

const voteSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.Number,
    ref: 'User',
    required: true,
  },
  candidacies: {
    type: [Candidacy.schema],
    required: true
  }
});

module.exports = mongoose.model('Vote', voteSchema);