import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileAbout = ({
  profile: {
    dateOfBirth,
    gender,
    address,
    city,
    state,
    zip,
    responsibleParty,
    // firstName2,
    // lastName2,
    // relationship,
    // phone,
    // address2,
    // city2,
    // state2,
    // zip2,
  },
}) => {
  return (
    <div>
      <div className='profile-about bg-light p-2'>
        <h3 className='text-primary'>
          Date of Birth: <Moment format='MM/DD/YYYY' date={dateOfBirth} />
          <br></br>
          Age:{' '}
          <Moment parse='YYYY-MM-DD HH:mm' fromNow ago>
            {dateOfBirth}
          </Moment>
          <br></br>
          Gender: {gender}
        </h3>
      </div>
      <div className='profile-about bg-light p-2'>
        <h3 className='text-primary'>
          Address: {address}
          <br></br>
          City:{city}
          <br></br>
          State: {state}
          <br></br>
          Zip: {zip}
        </h3>
      </div>
      <div className='profile-about bg-light p-2'>
        <h3 className='text-primary'>
          Responsible Party: {responsibleParty.firstName2}{' '}
          {responsibleParty.lastName2}
          <br></br>
          Relationship:{responsibleParty.relationship}
          <br></br>
          Phone: {responsibleParty.phone}
          <br></br>
          Address: {responsibleParty.address2}
          <br></br>
          City: {responsibleParty.city2}
          <br></br>
          State: {responsibleParty.state2}
          <br></br>
          Zip: {responsibleParty.zip2}
        </h3>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
