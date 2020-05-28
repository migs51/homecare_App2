import React, { useState, useEffect } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';

function Patients() {
  // Setting our component's initial state
  const [patients, setPatients] = useState([]);
  // const [formObject, setFormObject] = useState({});

  // Load all patients and store them with setpatients
  useEffect(() => {
    loadPatients();
  }, []);

  // Loads all patients and sets them to patients
  function loadPatients() {
    API.getPatients()
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a patient from the database with a given id, then reloads patients from the db
  function deletePatient(id) {
    API.deletePatient(id)
      .then((res) => loadPatients())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setFormObject({ ...formObject, [name]: value });
  // }

  // When the form is submitted, use the API.savepatient method to save the patient data
  // Then reload patients from the database
  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   if (formObject.title && formObject.author) {
  //     API.savepatient({
  //       title: formObject.title,
  //       author: formObject.author,
  //       synopsis: formObject.synopsis,
  //     })
  //       .then((res) => loadpatients())
  //       .catch((err) => console.log(err));
  //   }
  // }

  return (
    <Container fluid>
      <Row>
        <Col size='md-12 sm-12'>
          {patients.length ? (
            <List>
              {patients.map((patient) => (
                <ListItem key={patient._id}>
                  <Link to={'/patients/' + patient._id}>
                    <strong>
                      {patient.title} by {patient.author}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deletePatient(patient._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Patients;
