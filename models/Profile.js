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

// const ProfileSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//   },
//   company: {
//     type: String,
//   },
//   website: {
//     type: String,
//   },
//   location: {
//     type: String,
//   },
//   status: {
//     type: String,
//     required: true,
//   },
//   skills: {
//     type: [String],
//     required: true,
//   },
//   bio: {
//     type: String,
//   },
//   githubusername: {
//     type: String,
//   },
//   experience: [
//     {
//       title: {
//         type: String,
//         required: true,
//       },
//       company: {
//         type: String,
//         required: true,
//       },
//       location: {
//         type: String,
//       },
//       from: {
//         type: Date,
//         required: true,
//       },
//       to: {
//         type: Date,
//       },
//       current: {
//         type: Boolean,
//         default: false,
//       },
//       description: {
//         type: String,
//       },
//     },
//   ],
//   education: [
//     {
//       school: {
//         type: String,
//         required: true,
//       },
//       degree: {
//         type: String,
//         required: true,
//       },
//       fieldofstudy: {
//         type: String,
//         required: true,
//       },
//       from: {
//         type: Date,
//         required: true,
//       },
//       to: {
//         type: Date,
//       },
//       current: {
//         type: Boolean,
//         default: false,
//       },
//       description: {
//         type: String,
//       },
//     },
//   ],
//   social: {
//     youtube: {
//       type: String,
//     },
//     twitter: {
//       type: String,
//     },
//     facebook: {
//       type: String,
//     },
//     linkedin: {
//       type: String,
//     },
//     instagram: {
//       type: String,
//     },
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = Profile = mongoose.model('profile', ProfileSchema);
