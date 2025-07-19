import React from 'react';
import { Form } from 'react-bootstrap';

const TimeSlotSelector = ({ availableSlots, selectedSlot, onSelect }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Select a Time Slot</Form.Label>
      <Form.Select value={selectedSlot} onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Choose Slot --</option>
        {availableSlots.map((slot, index) => (
          <option key={index} value={slot}>
            {slot}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default TimeSlotSelector;
