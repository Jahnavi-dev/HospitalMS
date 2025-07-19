import React, { useEffect, useState } from "react";
import { Container, Table, Card, Form } from "react-bootstrap";

const AdminDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
    const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];

    setHospitals(storedHospitals);
    setDoctors(storedDoctors);

    if (storedHospitals.length > 0) {
      setSelectedHospitalId(storedHospitals[0].id || storedHospitals[0].name); // Fallback to name if id is not set
    }
  }, []);

  const selectedHospital = hospitals.find(
    (h) => h.id === selectedHospitalId || h.name === selectedHospitalId
  );

  const hospitalDoctors = doctors.filter((doc) =>
    doc.hospitals?.some(
      (h) => h.hospitalId === selectedHospitalId || h.hospitalId === selectedHospital?.id || h.hospitalId === selectedHospital?.name
    )
  );

  const getRevenueForDoctor = (doc) => {
    const hospital = doc.hospitals?.find(
      (h) => h.hospitalId === selectedHospitalId || h.hospitalId === selectedHospital?.id || h.hospitalId === selectedHospital?.name
    );

    const consultations = 5; // Placeholder
    const fee = hospital?.consultationFee || 0;
    const revenue = consultations * fee;

    return {
      consultations,
      doctorEarnings: revenue * 0.6,
      hospitalEarnings: revenue * 0.4,
    };
  };

  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>

      {/* Hospital Selector */}
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Select Hospital</Form.Label>
        <Form.Select
          value={selectedHospitalId}
          onChange={(e) => setSelectedHospitalId(e.target.value)}
        >
          {hospitals.map((hosp) => (
            <option key={hosp.id || hosp.name} value={hosp.id || hosp.name}>
              {hosp.name} - {hosp.location}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {selectedHospital && (
        <>
          {/* Hospital Info */}
          <Card className="p-3 mt-3">
            <h4>Hospital Info</h4>
            <p>
              <strong>Name:</strong> {selectedHospital.name}
            </p>
            <p>
              <strong>Location:</strong> {selectedHospital.location}
            </p>
            <p>
              <strong>Departments:</strong>{" "}
              {selectedHospital.departments?.join(", ")}
            </p>
          </Card>

          {/* Doctor Table */}
          <Card className="p-3 mt-3">
            <h4>Associated Doctors</h4>
            {hospitalDoctors.length === 0 ? (
              <p>No doctors found for this hospital.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Doctor Name</th>
                    <th>Specializations</th>
                    <th>Experience (yrs)</th>
                    <th>Consultations</th>
                    <th>Doctor Earnings (₹)</th>
                    <th>Hospital Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitalDoctors.map((doc, index) => {
                    const revenue = getRevenueForDoctor(doc);
                    return (
                      <tr key={doc.id || doc.name}>
                        <td>{index + 1}</td>
                        <td>{doc.name}</td>
                        <td>{doc.specializations?.join(", ")}</td>
                        <td>{doc.experience}</td>
                        <td>{revenue.consultations}</td>
                        <td>{revenue.doctorEarnings}</td>
                        <td>{revenue.hospitalEarnings}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Card>

          {/* Department Revenue */}
          <Card className="p-3 mt-3">
            <h4>Department-wise Revenue</h4>
            <ul>
              {selectedHospital.departments?.map((dept, i) => (
                <li key={i}>
                  {dept}: ₹{(i + 1) * 1000} (placeholder)
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
