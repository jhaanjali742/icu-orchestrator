import { useState } from "react";
import {
  FaHospitalAlt,
  FaAmbulance,
  FaUserShield,
  FaUserMd,
  FaArrowLeft,
} from "react-icons/fa";

function App() {
  const [page, setPage] = useState("landing");
  const [role, setRole] = useState("");

  return (
    <div className="app">
      {page === "landing" && (
        <section className="landing-page">
          <div className="landing-content">
            <div className="logo-badge">
              <FaHospitalAlt />
            </div>

            <h1>ICU Orchestrator</h1>
            <p>
              A real-time emergency platform that connects patients, ambulances,
              and hospitals to find ICU beds, oxygen, ventilators, and urgent
              care support.
            </p>

            <button onClick={() => setPage("auth")}>Get Started</button>
          </div>

          <div className="visual-card">
            <FaAmbulance />
            <h2>Emergency Care Network</h2>
            <p>Fast ICU discovery • Hospital availability • Ambulance support</p>
          </div>
        </section>
      )}

      {page === "auth" && (
        <section className="center-page">
          <button className="back-btn" onClick={() => setPage("landing")}>
            <FaArrowLeft /> Back
          </button>

          <div className="auth-card">
            <h1>Continue to ICU Orchestrator</h1>
            <p>
              Login for saved details, or skip directly during an emergency.
            </p>

            <div className="auth-buttons">
              <button onClick={() => setPage("role")}>Login</button>
              <button onClick={() => setPage("role")}>Sign Up</button>
              <button onClick={() => setPage("role")}>Skip for Emergency</button>
            </div>
          </div>
        </section>
      )}

      {page === "role" && (
        <section className="center-page">
          <button className="back-btn" onClick={() => setPage("auth")}>
            <FaArrowLeft /> Back
          </button>

          <div className="role-card">
            <h1>Who is using the app?</h1>
            <p>Select your role so we can show the correct emergency flow.</p>

            <div className="role-options">
              <button onClick={() => { setRole("patient"); setPage("request"); }}>
                <FaUserShield /> Patient / Relative
              </button>

              <button onClick={() => { setRole("stranger"); setPage("request"); }}>
                <FaAmbulance /> Stranger / Bystander
              </button>

              <button onClick={() => { setRole("hospital"); setPage("dashboard"); }}>
                <FaUserMd /> Hospital Worker
              </button>
            </div>
          </div>
        </section>
      )}

      {page === "request" && (
        <section className="center-page">
          <button className="back-btn" onClick={() => setPage("role")}>
            <FaArrowLeft /> Back
          </button>

          <div className="form-card">
            <h1>Emergency Request</h1>
            <p>Fill only the details available. Unknown details can be skipped.</p>

            <input placeholder="Current location / accident location" />

            {role === "patient" && (
              <>
                <input placeholder="Patient name (optional)" />
                <input placeholder="Age (optional)" />
                <input placeholder="Symptoms / condition" />
                <input placeholder="Blood group (optional)" />
                <input placeholder="Allergies (optional)" />
              </>
            )}

            {role === "stranger" && (
              <>
                <select>
                  <option>Visible condition</option>
                  <option>Unconscious</option>
                  <option>Bleeding</option>
                  <option>Breathing difficulty</option>
                  <option>Critical injury</option>
                  <option>Not sure</option>
                </select>

                <input placeholder="Visible injury / situation" />

                <select>
                  <option>Need ambulance?</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Not sure</option>
                </select>
              </>
            )}

            <button onClick={() => setPage("results")}>Find Nearest ICU</button>
          </div>
        </section>
      )}

      {page === "results" && (
        <section className="results-page">
          <button className="back-btn" onClick={() => setPage("request")}>
            <FaArrowLeft /> Back
          </button>

          <h1>Nearest Available Hospitals</h1>
          <p className="page-subtitle">
            Based on ICU beds, oxygen support, ventilators and emergency availability.
          </p>

          <div className="result-grid">
            <div className="hospital-result-card">
              <h2>City Care Hospital</h2>
              <p>📍 2.1 km away</p>
              <p>🛏 ICU Beds: 5</p>
              <p>💨 Oxygen: Available</p>
              <p>🚑 Ambulance: Available</p>
              <button onClick={() => setPage("tracking")}>Send Request</button>
            </div>

            <div className="hospital-result-card">
              <h2>Metro Emergency Center</h2>
              <p>📍 3.8 km away</p>
              <p>🛏 ICU Beds: 2</p>
              <p>💨 Oxygen: Low</p>
              <p>🚑 Ambulance: Available</p>
              <button onClick={() => setPage("tracking")}>Send Request</button>
            </div>

            <div className="map-card">
              <h2>Live Emergency Map</h2>
              <iframe
                title="Emergency Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.35%2C28.60%2C77.50%2C28.75&layer=mapnik"
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {page === "tracking" && (
        <section className="dashboard-page">
          <button className="back-btn" onClick={() => setPage("results")}>
            <FaArrowLeft /> Back
          </button>

          <h1>Request Sent Successfully</h1>
          <p className="page-subtitle">
            Your emergency request has been sent to the selected hospital.
          </p>

          <div className="dashboard-grid">
            <div>
              <h2>Status</h2>
              <strong>Sent</strong>
              <span>Hospital reviewing</span>
            </div>

            <div>
              <h2>Ambulance</h2>
              <strong>6 min</strong>
              <span>Estimated arrival</span>
            </div>

            <div>
              <h2>ICU</h2>
              <strong>Reserved</strong>
              <span>Temporary hold</span>
            </div>

            <div>
              <h2>Emergency</h2>
              <strong>Active</strong>
              <span>Case priority</span>
            </div>
          </div>
        </section>
      )}

      {page === "dashboard" && (
        <section className="dashboard-page">
          <button className="back-btn" onClick={() => setPage("role")}>
            <FaArrowLeft /> Back
          </button>

          <h1>Hospital Resource Dashboard</h1>
          <p className="page-subtitle">
            Update ICU beds, oxygen stock, ventilators, and incoming requests.
          </p>

          <div className="dashboard-grid">
            <div>
              <h2>ICU Beds</h2>
              <strong>12</strong>
              <span>Available</span>
            </div>

            <div>
              <h2>Oxygen</h2>
              <strong>78%</strong>
              <span>Stock Level</span>
            </div>

            <div>
              <h2>Ventilators</h2>
              <strong>6</strong>
              <span>Available</span>
            </div>

            <div>
              <h2>Requests</h2>
              <strong>4</strong>
              <span>Pending</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;