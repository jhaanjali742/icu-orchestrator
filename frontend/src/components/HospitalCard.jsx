import { useState } from "react";
import {
  FaAmbulance,
  FaBed,
  FaWind,
  FaUserMd,
  FaMapMarkerAlt,
} from "react-icons/fa";

function HospitalCard({ hospital }) {
  const [requestSent, setRequestSent] = useState(false);

  return (
    <div className="hospital-card">
      <div className="hospital-icon">
        <FaAmbulance />
      </div>

      <h3>{hospital.name}</h3>

      <p><FaMapMarkerAlt /> Distance: {hospital.distance}</p>
      <p><FaBed /> ICU Beds: {hospital.icuBeds}</p>
      <p><FaWind /> Oxygen: {hospital.oxygen}</p>
      <p><FaAmbulance /> Ventilators: {hospital.ventilators}</p>
      <p><FaUserMd /> Doctors: {hospital.doctors}</p>

      <button onClick={() => setRequestSent(true)}>
        Send Request
      </button>

      {requestSent && (
        <div className="accepted-popup">
          <h4>✅ Request Sent</h4>
          <p>{hospital.name} is reviewing your emergency request.</p>
        </div>
      )}
    </div>
  );
}

export default HospitalCard;