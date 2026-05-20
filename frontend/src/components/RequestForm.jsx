import { useState } from "react";

function RequestForm({ onSearch }) {
  const [userType, setUserType] = useState("");

  const handleSubmit = () => {
    onSearch();
  };

  return (
    <div className="request-form">
      <h2>Emergency Request</h2>
      <p className="form-note">Fill only the details you know.</p>

      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="">Who are you?</option>
        <option value="stranger">Stranger / Bystander</option>
        <option value="relative">Relative / Known Person</option>
        <option value="patient">Patient</option>
        <option value="hospital">Hospital Worker</option>
      </select>

      {userType === "stranger" && (
        <>
          <input type="text" placeholder="Accident location" />

          <select>
            <option>Patient condition</option>
            <option>Unconscious</option>
            <option>Bleeding</option>
            <option>Breathing problem</option>
            <option>Critical injury</option>
            <option>Not sure</option>
          </select>

          <input type="text" placeholder="Visible injury / situation" />

          <select>
            <option>Need ambulance?</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not sure</option>
          </select>
        </>
      )}

      {userType === "relative" && (
        <>
          <input type="text" placeholder="Patient name (optional)" />
          <input type="number" placeholder="Age (optional)" />

          <select>
            <option>Gender (optional)</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input type="text" placeholder="Location" />
          <input type="text" placeholder="Blood group (optional)" />
          <input type="text" placeholder="Allergies (optional)" />

          <select>
            <option>Need ventilator?</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not sure</option>
          </select>
        </>
      )}

      {userType === "patient" && (
        <>
          <input type="text" placeholder="Your location" />
          <input type="text" placeholder="Your problem / symptoms" />
          <input type="text" placeholder="Blood group (optional)" />
          <input type="text" placeholder="Allergies (optional)" />
        </>
      )}

      {userType === "hospital" && (
        <>
          <input type="text" placeholder="Hospital name" />
          <input type="number" placeholder="Available ICU beds" />
          <input type="number" placeholder="Available ventilators" />

          <select>
            <option>Oxygen available?</option>
            <option>Yes</option>
            <option>No</option>
            <option>Low</option>
          </select>
        </>
      )}

      {userType && (
        <button type="button" onClick={handleSubmit}>
          Submit Request
        </button>
      )}
    </div>
  );
}

export default RequestForm;