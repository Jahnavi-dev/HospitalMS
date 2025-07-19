import React from 'react';
import { Card, Button } from 'react-bootstrap';

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{doctor.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{doctor.qualifications}</Card.Subtitle>
        <Card.Text>
          <strong>Specializations:</strong> {doctor.specializations.join(', ')} <br />
          <strong>Experience:</strong> {doctor.experience} years <br />
          <strong>Hospital:</strong> {doctor.hospitalName} <br />
          <strong>Fee:</strong> ₹{doctor.fee}
        </Card.Text>
        {onBook && (
          <Button variant="primary" onClick={() => onBook(doctor)}>
            Book Appointment
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
