import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { appointments } from "../utils/dummyData";

const PatientDashboard = () => {
  const [patient, setPatient] = useState({
    name: "",
    gender: "",
    dob: "",
    uniqueId: "",
  });

  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  // Dummy consultation history based on appointments
  const patientAppointments = appointments.filter(
    (appt) => appt.patientId === patient.uniqueId
  );

  return (
    <Container className="mt-4">
      <h2>Patient Dashboard</h2>

      {!registered ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={patient.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={patient.dob}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Unique ID (Aadhar/Passport)</Form.Label>
            <Form.Control
              name="uniqueId"
              value={patient.uniqueId}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit">Register</Button>
        </Form>
      ) : (
        <>
          <p className="mt-3">Welcome, {patient.name}</p>
          <h5 className="mt-4">Consultation History</h5>
          {patientAppointments.length > 0 ? (
            <Table striped bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Doctor</th>
                  <th>Hospital</th>
                  <th>Date & Time</th>
                  <th>Fee Paid</th>
                </tr>
              </thead>
              <tbody>
                {patientAppointments.map((appt, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{appt.doctorName}</td>
                    <td>{appt.hospitalName}</td>
                    <td>{appt.timeSlot}</td>
                    <td>₹{appt.fee}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No appointments found.</p>
          )}
        </>
      )}
    </Container>
  );
};

export default PatientDashboard;
