const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Patient = require('../../models/Patient');
const User = require('../../models/User');

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

//@route     PUT api/patient
//@desc      Update patient
//@access    private
router.put(
  '/:id',
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
      let patient = await Patient.findOneAndUpdate(req.params._id);
      console.log(patient);

      //   if (patient) {
      //     //if there is a profile Update it and send back the profile
      //     patient = await Patient.findOneAndUpdate(
      //       { user: req.user.id },
      //       { $set: patientFields },
      //       { new: true }
      //     );

      //     return res.json(patient);
      //   }

      //   //if no profile found then Create a new one
      //   patient = new Patient(patientFields);

      await patient.save();
      res.json(patient);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route     GET api/patient
//@desc      get all patients by user_id
//@access    private
router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find().populate('user', ['name', 'avatar']);
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route     GET api/patient/:profile_id
//@desc      get patient by
//@access    private
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route     DELETE api/patient
//@desc      Delete patient
//@access    Private
router.delete('/', auth, async (req, res) => {
  try {
    await Patient.findOneAndRemove({ _id: req.body.id });
    res.json({ msg: 'Patient deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route     PUT api/patient/:profile_id
//@desc      update patient information
//@access    Private

module.exports = router;
