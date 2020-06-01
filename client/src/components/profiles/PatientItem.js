import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PatientItem = ({
  profile: {
    user: { name, avatar },
    firstName,
    lastName,
    _id,
    // status,
    // company,
    // location,
    // skills,
  },
}) => {
  return (
    <div className='profile bg-light'>
      {/* <img src={avatar} alt='' className='round-img' /> */}
      <div>
        <h2>
          {firstName} {lastName}
        </h2>
        <Link to={`/patient/${_id}`} className='btn btn-primary'>
          View Patient
        </Link>
      </div>
    </div>
  );
};

PatientItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default PatientItem;
