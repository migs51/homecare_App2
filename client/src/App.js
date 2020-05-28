import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Patients from './pages/AllPatients';
import Patient from './pages/PatientForm';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={['/', '/patients']}>
            <Patients />
          </Route>
          <Route exact path='/patients/:id'>
            <Patient />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
