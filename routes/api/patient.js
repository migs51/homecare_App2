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
      check('firstName2', 'Responsible Party First Name is required')
        .not()
        .isEmpty(),
      check('lastName2', 'Responsible Party Last Name is required')
        .not()
        .isEmpty(),
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
router.put(
  '/:_id',
  [
    auth,
    [
      check('firstName', 'First Name is required').not().isEmpty(),
      check('lastName', 'Last Name is required').not().isEmpty(),
      check('firstName2', 'Responsible Party First Name is required')
        .not()
        .isEmpty(),
      check('lastName2', 'Responsible Party Last Name is required')
        .not()
        .isEmpty(),
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
      let patient = await Patient.findById(req.params._id);
      console.log(patient);

      if (patient) {
        //if there is a patient Update it and send back the patient
        patient = await Patient.findByIdAndUpdate(
          req.params._id,
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
    // await Post.deleteMany({ user: req.user.id });
    // Remove patient
    await Patient.findOneAndRemove({ _id });
    // Remove user
    // await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Patient deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
