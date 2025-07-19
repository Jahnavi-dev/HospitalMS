import { useState} from "react";
import { Form, Button, Card } from "react-bootstrap";

const RegisterHospital = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const [departments, setDepartments] = useState([""]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleDepartmentChange = (index, value) => {
    const updated = [...departments];
    updated[index] = value;
    setDepartments(updated);
  };

  const addDepartment = () => {
    setDepartments([...departments, ""]);
  };

  const getStoredHospitals = () => {
    const data = localStorage.getItem("hospitals");
    return data ? JSON.parse(data) : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newHospital = {
      name: hospitalName.trim(),
      location: location.trim(),
      departments: departments.filter((d) => d.trim() !== ""),
    };

    const existingHospitals = getStoredHospitals();

    // Check for duplicate (name + location)
    const isDuplicate = existingHospitals.some(
      (h) =>
        h.name.toLowerCase() === newHospital.name.toLowerCase() &&
        h.location.toLowerCase() === newHospital.location.toLowerCase()
    );

    if (isDuplicate) {
      setError("Hospital is already registered with this name and location.");
      setSubmitted(false);
      return;
    }

    const updatedHospitals = [...existingHospitals, newHospital];
    localStorage.setItem("hospitals", JSON.stringify(updatedHospitals));

    setSubmitted(true);
    setError("");
    console.log("Hospital Registered:", newHospital);

    // Reset form
    setHospitalName("");
    setLocation("");
    setDepartments([""]);
  };

  return (
    <Card className="p-4 m-3 shadow">
      <h4>Register New Hospital</h4>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Hospital Name</Form.Label>
          <Form.Control
            type="text"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Label>Departments</Form.Label>
        {departments.map((dept, index) => (
          <Form.Group className="mb-2" key={index}>
            <Form.Control
              type="text"
              placeholder={`Department ${index + 1}`}
              value={dept}
              onChange={(e) => handleDepartmentChange(index, e.target.value)}
              required
            />
          </Form.Group>
        ))}

        <Button variant="secondary" onClick={addDepartment} className="mb-3">
          + Add Department
        </Button>

        <div>
          <Button type="submit" variant="primary">
            Register Hospital
          </Button>
        </div>
      </Form>

      {error && <div className="mt-3 text-danger">{error}</div>}
      {submitted && <div className="mt-3 text-success">Hospital registered successfully!</div>}
    </Card>
  );
};

export default RegisterHospital;
