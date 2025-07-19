// Mock data to simulate hospital system

export const hospitals = [
  {
    id: 1,
    name: "City Hospital",
    location: "Mumbai",
    departments: ["Cardiology", "Orthopedics"]
  },
  {
    id: 2,
    name: "Care Clinic",
    location: "Delhi",
    departments: ["Pediatrics", "General Medicine"]
  }
];
export const doctors = [
  {
    name: "Dr. Asha Rao",
    qualifications: "MBBS, MD",
    specializations: ["Cardiology"],
    experience: 10,
    hospitals: ["City Hospital"],
    availability: {
      "City Hospital": ["2025-07-20 10:00", "2025-07-20 11:00", "2025-07-21 09:00"]
    },
    fees: {
      "City Hospital": 500
    }
  },
  {
    name: "Dr. Rahul Mehta",
    qualifications: "MBBS, MS",
    specializations: ["Orthopedics"],
    experience: 8,
    hospitals: ["City Hospital"],
    availability: {
      "City Hospital": ["2025-07-21 14:00", "2025-07-22 10:00"]
    },
    fees: {
      "City Hospital": 600
    }
  },
  {
    name: "Dr. Sneha Jain",
    qualifications: "MBBS, DCH",
    specializations: ["Pediatrics"],
    experience: 5,
    hospitals: ["Care Clinic"],
    availability: {
      "Care Clinic": ["2025-07-20 16:00", "2025-07-22 11:00"]
    },
    fees: {
      "Care Clinic": 400
    }
  }
];

export const appointments = []; // Optional: You can push booked appointments here during booking

export const patients = [
  {
    id: "ABC1234567",
    name: "Ravi Kumar",
    gender: "Male",
    dob: "1990-03-12"
  },
  {
    id: "XYZ9876543",
    name: "Anjali Sharma",
    gender: "Female",
    dob: "1985-08-25"
  }
];
