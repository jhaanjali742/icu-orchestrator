import { useEffect, useState } from "react";
import {
  FaHospitalAlt,
  FaAmbulance,
  FaUserShield,
  FaUserMd,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBed,
  FaWind,
  FaHeartbeat,
} from "react-icons/fa";

function App() {
  const [page, setPage] = useState("landing");
  const [role, setRole] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    patientName: "",
    age: "",
    condition: "",
    bloodGroup: "",
    allergies: "",
    visibleCondition: "",
    visibleInjury: "",
    ambulanceNeeded: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/hospitals")
      .then((res) => res.json())
      .then((data) => setHospitals(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/api/emergency-requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitEmergencyRequest = () => {
    if (!formData.location.trim()) {
      alert("Please enter location first.");
      return;
    }

    if (role === "patient" && !formData.condition.trim()) {
      alert("Please enter patient condition or symptoms.");
      return;
    }

    if (role === "stranger" && !formData.visibleCondition.trim()) {
      alert("Please select visible condition.");
      return;
    }
  setLoading(true);
    fetch("http://localhost:5000/api/emergency-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        ...formData,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetch("http://localhost:5000/api/emergency-requests")
          .then((res) => res.json())
          .then((data) => setRequests(data));

       setTimeout(() => {
  setLoading(false);
  setPage("results");
}, 1500);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app">
      {loading && (
  <div className="loading-screen">
    <div className="loading-card">
      <div className="loading-pulse">🚑</div>
      <h2>Searching Nearest ICU Hospitals...</h2>
      <p>Checking beds, oxygen, ventilators and ambulance availability.</p>
    </div>
  </div>
)}
      {page === "landing" && (
        <section className="landing-page">
          <div className="landing-left">
            <div className="brand-pill">
              <FaHospitalAlt /> Emergency ICU Network
            </div>

            <h1>
              Find ICU Beds <br />
              When Every Second Matters.
            </h1>

            <p>
              ICU Orchestrator connects patients, ambulances, and hospitals to
              locate ICU beds, oxygen support, ventilators, and emergency care
              in real time.
            </p>

            <div className="hero-actions">
              <button onClick={() => setPage("auth")}>
                Start Emergency Request
              </button>
              <span>Live hospital coordination prototype</span>
            </div>
          </div>

          <div className="landing-right">
            <div className="main-emergency-card">
              <FaAmbulance />
              <h2>Ambulance Dispatch</h2>
              <p>
                Nearest ICU-ready hospital found fast with live emergency
                resource visibility.
              </p>
            </div>

            <div className="mini-stats">
              <div>
                <strong>24/7</strong>
                <span>Emergency Access</span>
              </div>
              <div>
                <strong>Live</strong>
                <span>ICU Availability</span>
              </div>
              <div>
                <strong>6 min</strong>
                <span>Ambulance ETA</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === "auth" && (
        <section className="center-page">
          <button className="back-btn" onClick={() => setPage("landing")}>
            <FaArrowLeft /> Back
          </button>

          <div className="auth-card">
            <div className="page-icon">
              <FaUserShield />
            </div>

            <h1>Continue Safely</h1>
            <p>
              Login to keep medical details saved, or skip directly if this is
              an emergency situation.
            </p>

            <div className="auth-buttons">
              <button onClick={() => setPage("role")}>Login</button>
              <button onClick={() => setPage("role")}>Sign Up</button>
              <button onClick={() => setPage("role")}>
                Skip Emergency Login
              </button>
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
            <h1>Who is using the platform?</h1>
            <p>
              We adjust the emergency form based on what information you may
              actually know.
            </p>

            <div className="role-options">
              <button
                onClick={() => {
                  setRole("patient");
                  setPage("request");
                }}
              >
                <FaUserShield /> Patient / Relative
              </button>

              <button
                onClick={() => {
                  setRole("stranger");
                  setPage("request");
                }}
              >
                <FaAmbulance /> Stranger / Bystander
              </button>

              <button
                onClick={() => {
                  setRole("hospital");
                  setPage("dashboard");
                }}
              >
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
            <p>
              Fill only what is known. The system can still search hospitals
              even when details are missing.
            </p>

            <input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Current location / accident location"
            />

            {role === "patient" && (
              <>
                <input
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="Patient name (optional)"
                />
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age (optional)"
                />
                <input
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  placeholder="Symptoms / condition"
                />
                <input
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  placeholder="Blood group (optional)"
                />
                <input
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="Allergies (optional)"
                />
              </>
            )}

            {role === "stranger" && (
              <>
                <select
                  name="visibleCondition"
                  value={formData.visibleCondition}
                  onChange={handleInputChange}
                >
                  <option value="">Visible condition</option>
                  <option>Unconscious</option>
                  <option>Bleeding</option>
                  <option>Breathing difficulty</option>
                  <option>Critical injury</option>
                  <option>Not sure</option>
                </select>

                <input
                  name="visibleInjury"
                  value={formData.visibleInjury}
                  onChange={handleInputChange}
                  placeholder="Visible injury / situation"
                />

                <select
                  name="ambulanceNeeded"
                  value={formData.ambulanceNeeded}
                  onChange={handleInputChange}
                >
                  <option value="">Need ambulance?</option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Not sure</option>
                </select>
              </>
            )}

            <button onClick={submitEmergencyRequest}>Find Nearest ICU</button>
          </div>
        </section>
      )}

      {page === "results" && (
        <section className="results-page">
          <button className="back-btn" onClick={() => setPage("request")}>
            <FaArrowLeft /> Back
          </button>

          <div className="section-header">
            <h1>Nearest Available Hospitals</h1>
            <p>
              Matched using ICU beds, oxygen support, ambulance availability,
              and emergency readiness.
            </p>
          </div>

          <div className="result-grid">
            {hospitals.map((hospital) => (
              <div className="hospital-result-card" key={hospital.id}>
                <h2>{hospital.name}</h2>
                <p>
                  <FaMapMarkerAlt /> {hospital.distance} away
                </p>
                <p>
                  <FaBed /> ICU Beds: {hospital.icuBeds}
                </p>
                <p>
                  <FaWind /> Oxygen: {hospital.oxygen}
                </p>
                <p>
                  <FaAmbulance /> Ambulance: {hospital.ambulance}
                </p>

                <button onClick={() => setPage("tracking")}>
                  Send Request
                </button>
              </div>
            ))}

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

          <div className="section-header">
            <h1>Emergency Request Active</h1>
            <p>
              Your request has been sent to the selected hospital for review and
              ambulance coordination.
            </p>
          </div>

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
              <strong>Hold</strong>
              <span>Temporary reservation</span>
            </div>

            <div>
              <h2>Priority</h2>
              <strong>High</strong>
              <span>Emergency case</span>
            </div>
          </div>
        </section>
      )}

      {page === "dashboard" && (
        <section className="dashboard-page">
          <button className="back-btn" onClick={() => setPage("role")}>
            <FaArrowLeft /> Back
          </button>

          <div className="section-header">
            <h1>Hospital Resource Dashboard</h1>
            <p>
              Update ICU capacity, oxygen stock, ventilators, and incoming
              emergency requests.
            </p>
          </div>

          <div className="dashboard-grid">
            <div>
              <h2>
                <FaBed /> ICU Beds
              </h2>
              <strong>12</strong>
              <span>Available</span>
            </div>

            <div>
              <h2>
                <FaWind /> Oxygen
              </h2>
              <strong>78%</strong>
              <span>Stock Level</span>
            </div>

            <div>
              <h2>
                <FaHeartbeat /> Ventilators
              </h2>
              <strong>6</strong>
              <span>Available</span>
            </div>

            <div>
              <h2>
                <FaAmbulance /> Requests
              </h2>
              <strong>{requests.length}</strong>
              <span>Incoming Cases</span>
            </div>
          </div>

          <div className="hospital-requests-section">
            <h2>Incoming Emergency Requests</h2>

            {requests.length === 0 ? (
              <p>No emergency requests yet.</p>
            ) : (
              requests.map((request) => (
                <div className="request-card" key={request.id}>
                  <h3>Emergency Case #{request.id}</h3>

                  <p>
                    <strong>Role:</strong> {request.role}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {request.location || "Not provided"}
                  </p>

                  <p>
                    <strong>Condition:</strong>{" "}
                    {request.condition ||
                      request.visibleCondition ||
                      "Not provided"}
                  </p>

                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;