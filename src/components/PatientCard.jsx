import React from 'react';
import { Card } from 'react-bootstrap';

const PatientCard = ({ patient }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{patient.name}</Card.Title>
        <Card.Text>
          <strong>Gender:</strong> {patient.gender} <br />
          <strong>Date of Birth:</strong> {patient.dob} <br />
          <strong>ID:</strong> {patient.uniqueId}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PatientCard;
