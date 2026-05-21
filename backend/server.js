const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const hospitals = [
  {
    id: 1,
    name: "City Care Hospital",
    distance: "2.1 km",
    icuBeds: 5,
    oxygen: "Available",
    ambulance: "Available",
  },
  {
    id: 2,
    name: "Metro Emergency Center",
    distance: "3.8 km",
    icuBeds: 2,
    oxygen: "Low",
    ambulance: "Available",
  },
  {
    id: 3,
    name: "Apollo Trauma Unit",
    distance: "5.4 km",
    icuBeds: 7,
    oxygen: "Available",
    ambulance: "Busy",
  },
];

let emergencyRequests = [];

app.get("/", (req, res) => {
  res.send("ICU Orchestrator Backend Running");
});

app.get("/api/hospitals", (req, res) => {
  res.json(hospitals);
});

app.post("/api/emergency-request", (req, res) => {
  const newRequest = {
    id: emergencyRequests.length + 1,
    ...req.body,
    status: "Hospital Reviewing",
    ambulanceETA: "6 mins",
    icuReserved: true,
    createdAt: new Date(),
  };

  emergencyRequests.push(newRequest);

  console.log("Emergency Request Saved:");
  console.log(newRequest);

  res.json({
    success: true,
    message: "Emergency request saved successfully",
    request: newRequest,
  });
});

app.get("/api/emergency-requests", (req, res) => {
  res.json(emergencyRequests);
});

app.get("/api/request-status/:id", (req, res) => {
  const requestId = Number(req.params.id);

  const request = emergencyRequests.find((item) => item.id === requestId);

  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Request not found",
    });
  }

  res.json({
    success: true,
    status: request.status,
    ambulanceETA: request.ambulanceETA,
    icuReserved: request.icuReserved,
    request,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});