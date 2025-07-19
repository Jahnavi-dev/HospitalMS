import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { hospitals } from "../utils/dummyData";

const DoctorDashboard = () => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [fee, setFee] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [slotInput, setSlotInput] = useState("");

  const handleAddSlot = () => {
    if (slotInput && !timeSlots.includes(slotInput)) {
      setTimeSlots([...timeSlots, slotInput]);
      setSlotInput("");
    }
  };

  const selectedHospital = hospitals.find(
    (h) => h.id === parseInt(hospitalId)
  );

  const specializationMatch = selectedHospital?.departments.includes(
    specialization
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!specializationMatch) {
      alert("Selected hospital doesn't have the required department.");
      return;
    }

    alert("Doctor registered successfully.");
    console.log({
      name,
      specialization,
      experience,
      hospital: selectedHospital.name,
      fee,
      timeSlots,
    });

    // Clear form
    setName("");
    setSpecialization("");
    setExperience("");
    setHospitalId("");
    setFee("");
    setTimeSlots([]);
  };

  return (
    <Container className="mt-4">
      <h2>Doctor Dashboard</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Specialization</Form.Label>
          <Form.Select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Neurology">Neurology</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Experience (years)</Form.Label>
          <Form.Control
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Hospital</Form.Label>
          <Form.Select
            value={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            required
          >
            <option value="">Select Hospital</option>
            {hospitals.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </Form.Select>
          {hospitalId && !specializationMatch && (
            <div className="text-danger mt-1">
              This hospital doesn't have your specialization.
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Consultation Fee (₹)</Form.Label>
          <Form.Control
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Time Slots</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="datetime-local"
              value={slotInput}
              onChange={(e) => setSlotInput(e.target.value)}
            />
            <Button type="button" onClick={handleAddSlot}>
              Add Slot
            </Button>
          </div>
        </Form.Group>

        {timeSlots.length > 0 && (
          <Table bordered className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Slot</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{slot}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default DoctorDashboard;

