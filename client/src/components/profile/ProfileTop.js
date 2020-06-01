import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    firstName,
    lastName,
    middleName,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>
        {firstName} {middleName} {lastName}
      </h1>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
