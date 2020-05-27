const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: Number,
  },
  responsibleParty: {
    firstName2: {
      type: String,
    },
    lastName2: {
      type: String,
    },
    relationship: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address2: {
      type: String,
    },
    city2: {
      type: String,
    },
    state2: {
      type: String,
    },
    zip2: {
      type: Number,
    },
  },
});

module.exports = Patient = mongoose.model('patient', PatientSchema);
