import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import ProfileForm from '../profile-forms/ProfileForm';
import Patients from '../profiles/Patient';
import Patient from '../profile/Patient';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = (props) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/patient' component={Patients} />
        <PrivateRoute exact path='/patient/:id' component={Patient} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
