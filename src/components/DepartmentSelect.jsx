import React from 'react';
import { Form } from 'react-bootstrap';

const DepartmentSelect = ({ departments, selectedDept, onSelect }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Select Department</Form.Label>
      <Form.Select value={selectedDept} onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Choose Department --</option>
        {departments.map((dept, index) => (
          <option key={index} value={dept}>
            {dept}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default DepartmentSelect;
