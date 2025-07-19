import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { hospitals, doctors } from "../utils/dummyData";

const BookAppointment = () => {
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [patientId, setPatientId] = useState("");
  const [fee, setFee] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();

    if (!selectedHospital || !selectedDoctor || !timeSlot || !patientId || !fee) {
      alert("Please fill all fields.");
      return;
    }

    // Simulate storing the appointment
    console.log("Appointment Booked:", {
      patientId,
      hospital: selectedHospital,
      doctor: selectedDoctor,
      timeSlot,
      fee
    });

    alert("Appointment Booked Successfully!");
    
    // Reset form
    setSelectedHospital("");
    setSelectedDoctor("");
    setTimeSlot("");
    setFee("");
    setPatientId("");
  };

  const doctorsInHospital = doctors.filter(doc =>
    doc.hospitals?.includes(selectedHospital)
  );

  const selectedDoc = doctors.find(doc => doc.name === selectedDoctor);
  const availableSlots = selectedDoc?.availability?.[selectedHospital] || [];

  return (
    <Container className="mt-4">
      <h2>Book Appointment</h2>

      <Form className="form-container" onSubmit={handleBooking}>
        <Form.Group className="mb-3">
          <Form.Label>Patient Unique ID</Form.Label>
          <Form.Control
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Hospital</Form.Label>
          <Form.Select
            value={selectedHospital}
            onChange={(e) => {
              setSelectedHospital(e.target.value);
              setSelectedDoctor("");
              setTimeSlot("");
            }}
            required
          >
            <option value="">-- Select --</option>
            {hospitals.map((hosp, idx) => (
              <option key={idx} value={hosp.name}>
                {hosp.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {selectedHospital && (
          <Form.Group className="mb-3">
            <Form.Label>Select Doctor</Form.Label>
            <Form.Select
              value={selectedDoctor}
              onChange={(e) => {
                setSelectedDoctor(e.target.value);
                setTimeSlot("");
              }}
              required
            >
              <option value="">-- Select --</option>
              {doctorsInHospital.map((doc, idx) => (
                <option key={idx} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        {selectedDoctor && (
          <Form.Group className="mb-3">
            <Form.Label>Select Time Slot</Form.Label>
            <Form.Select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              {availableSlots.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        {selectedDoctor && (
          <Form.Group className="mb-3">
            <Form.Label>Consultation Fee</Form.Label>
            <Form.Control
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              required
            />
          </Form.Group>
        )}

        <Button type="submit">Book</Button>
      </Form>
    </Container>
  );
};

export default BookAppointment;
