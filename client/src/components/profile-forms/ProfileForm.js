import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  firstName2: '',
  lastName2: '',
  relationship: '',
  phone: '',
  address2: '',
  city2: '',
  state2: '',
  zip2: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.responsibleParty) {
        if (key in profileData)
          profileData[key] = profile.responsibleParty[key];
      }
      // if (Array.isArray(profileData.skills))
      //   profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    firstName,
    lastName,
    middleName,
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
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Patient Record</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Fill out patient information
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='*First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Middle Name'
            name='middleName'
            value={middleName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='*Last Name'
            name='lastName'
            value={lastName}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='date'
            placeholder='Date of Birth'
            name='dateOfBirth'
            value={dateOfBirth}
            onChange={onChange}
          />
          <small className='form-text'>Enter Patient Date of Birth</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Gender'
            name='gender'
            value={gender}
            onChange={onChange}
          />
          <small className='form-text'>Write in Male or Female</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Address'
            name='address'
            value={address}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='City'
            name='city'
            value={city}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='State'
            name='state'
            value={state}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Zip Code'
            name='zip'
            value={zip}
            onChange={onChange}
          />
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Responsible Party
          </button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div>
              <input
                type='text'
                placeholder='First Name'
                name='firstName2'
                value={firstName2}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='Last Name'
                name='lastName2'
                value={lastName2}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='Relationship to Patient'
                name='relationship'
                value={relationship}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                type='tel'
                placeholder='Phone Number'
                name='phone'
                value={phone}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                type='text'
                placeholder='Address of Responsible Party'
                name='address2'
                value={address2}
                onChange={onChange}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='City'
                name='city2'
                value={city2}
                onChange={onChange}
              />
            </div>
            <div>
              <input
                type='text'
                placeholder='State'
                name='state2'
                value={state2}
                onChange={onChange}
              />
            </div>
            <div>
              <input
                type='number'
                placeholder='Zip Code'
                name='zip2'
                value={zip2}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/patient'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
