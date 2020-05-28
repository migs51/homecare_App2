import React from 'react';

function Nav() {
  return (
    <nav className='navbar navbar-light bg-success'>
      <a className='navbar-brand' href='/'>
        Homecare App
      </a>
      <button type='button' class='btn btn-dark'>
        Logout
      </button>
    </nav>
  );
}

export default Nav;
