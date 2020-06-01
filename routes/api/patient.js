const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Patient = require('../../models/Profile');
const User = require('../../models/User');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Patient.find({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route     POST api/patient
//@desc      Create patient
//@access    private
router.post(
  '/',
  [
    auth,
    [
      check('firstName', 'First Name is required').not().isEmpty(),
      check('lastName', 'Last Name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      zip,
      firstName2,
      lastName2,
      relationship,
      phone,
      address2,
      city2,
      state2,
      zip2,
    } = req.body;

    //Build patient object to insert into db . check if fields are actually coming in before we set it
    const patientFields = {};
    patientFields.user = req.user.id;
    if (firstName) patientFields.firstName = firstName;
    if (middleName) patientFields.middleName = middleName;
    if (lastName) patientFields.lastName = lastName;
    if (dateOfBirth) patientFields.dateOfBirth = dateOfBirth;
    if (gender) patientFields.gender = gender;
    if (address) patientFields.address = address;
    if (city) patientFields.city = city;
    if (state) patientFields.state = state;
    if (zip) patientFields.zip = zip;

    //Build responsibleParty object
    patientFields.responsibleParty = {};
    if (firstName2) patientFields.responsibleParty.firstName2 = firstName2;
    if (lastName2) patientFields.responsibleParty.lastName2 = lastName2;
    if (relationship)
      patientFields.responsibleParty.relationship = relationship;
    if (phone) patientFields.responsibleParty.phone = phone;
    if (address2) patientFields.responsibleParty.address2 = address2;
    if (city2) patientFields.responsibleParty.city2 = city2;
    if (state2) patientFields.responsibleParty.state2 = state2;
    if (zip2) patientFields.responsibleParty.zip2 = zip2;

    try {
      //find the current patient by id
      let patient = await Patient.findById(req.body.id);
      console.log(patient);

      if (patient) {
        //if there is a profile Update it and send back the profile
        patient = await Patient.findOneAndUpdate(
          { user: req.user.id },
          { $set: patientFields },
          { new: true }
        );

        return res.json(patient);
      }

      //if no profile found then Create a new one
      patient = new Patient(patientFields);

      await patient.save();
      res.json(patient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/patient/:_id
// @desc      Update patient
// @access    private
// router.put(
//   '/edit/:_id',
//   [
//     auth,
//     [
//       check('firstName', 'First Name is required').not().isEmpty(),
//       check('lastName', 'Last Name is required').not().isEmpty(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const {
//       firstName,
//       middleName,
//       lastName,
//       dateOfBirth,
//       gender,
//       address,
//       city,
//       state,
//       zip,
//       firstName2,
//       lastName2,
//       relationship,
//       phone,
//       address2,
//       city2,
//       state2,
//       zip2,
//     } = req.body;

//     //Build patient object to insert into db . check if fields are actually coming in before we set it
//     const patientFields = {};
//     patientFields.user = req.user.id;
//     if (firstName) patientFields.firstName = firstName;
//     if (middleName) patientFields.middleName = middleName;
//     if (lastName) patientFields.lastName = lastName;
//     if (dateOfBirth) patientFields.dateOfBirth = dateOfBirth;
//     if (gender) patientFields.gender = gender;
//     if (address) patientFields.address = address;
//     if (city) patientFields.city = city;
//     if (state) patientFields.state = state;
//     if (zip) patientFields.zip = zip;

//     //Build responsibleParty object
//     patientFields.responsibleParty = {};
//     if (firstName2) patientFields.responsibleParty.firstName2 = firstName2;
//     if (lastName2) patientFields.responsibleParty.lastName2 = lastName2;
//     if (relationship)
//       patientFields.responsibleParty.relationship = relationship;
//     if (phone) patientFields.responsibleParty.phone = phone;
//     if (address2) patientFields.responsibleParty.address2 = address2;
//     if (city2) patientFields.responsibleParty.city2 = city2;
//     if (state2) patientFields.responsibleParty.state2 = state2;
//     if (zip2) patientFields.responsibleParty.zip2 = zip2;

//     try {
//       //find the current patient by id
//       let patient = await Patient.findById(req.params._id);
//       console.log(patient);

//       if (patient) {
//         //if there is a patient Update it and send back the patient
//         patient = await Patient.findByIdAndUpdate(
//           req.params._id,
//           { $set: patientFields },
//           { new: true }
//         );

//         return res.json(patient);
//       }

//       //if no profile found then Create a new one
//       patient = new Patient(patientFields);

//       await patient.save();
//       res.json(patient);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// @route    GET api/profile
// @desc     Get all profiles
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Patient.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/patient/:_id
// @desc     Get patient by patient id
// @access   Private
router.get(
  '/:_id',
  auth,
  checkObjectId('_id'),
  async ({ params: { _id } }, res) => {
    try {
      const patient = await Patient.findOne({
        _id,
      }).populate('user', ['name', 'avatar']);

      if (!patient) return res.status(400).json({ msg: 'Patient not found' });

      return res.json(patient);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/patient
// @desc     Delete patient
// @access   Private
router.delete('/:_id', auth, async ({ params: { _id } }, res) => {
  try {
    // Remove user posts
    // await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Patient.findOneAndRemove({ _id });
    // Remove user
    // await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Patient deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});

module.exports = router;
