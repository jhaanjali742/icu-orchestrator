import { useState } from "react";
import { FaHospitalAlt, FaMobileAlt, FaDesktop } from "react-icons/fa";

import Navbar from "./components/Navbar";
import RequestForm from "./components/RequestForm";
import HospitalCard from "./components/HospitalCard";
import StatusTracker from "./components/StatusTracker";
import LiveMap from "./components/LiveMap";
import AmbulanceTracker from "./components/AmbulanceTracker";
import HospitalDashboard from "./components/HospitalDashboard";

import { hospitals } from "./data/dummyHospitals";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [deviceMode, setDeviceMode] = useState("");
  const [showHospitals, setShowHospitals] = useState(false);

  if (showIntro) {
    return (
      <div className="intro-screen">
        <div className="intro-card">
          <div className="intro-logo">
            <FaHospitalAlt />
          </div>

          <h1>ICU Orchestrator</h1>
          <p>Smart Emergency Care Network</p>

          <button onClick={() => setShowIntro(false)}>
            Get Started
          </button>
        </div>
      </div>
    );
  }

  if (!deviceMode) {
    return (
      <div className="device-screen">
        <div className="device-card">
          <h1>Choose App Preview Mode</h1>
          <p>Select how you want to view the emergency platform.</p>

          <div className="device-options">
            <button onClick={() => setDeviceMode("phone")}>
              <FaMobileAlt />
              Phone Mode
            </button>

            <button onClick={() => setDeviceMode("desktop")}>
              <FaDesktop />
              Desktop Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={deviceMode === "phone" ? "phone-preview" : "desktop-preview"}>
      <div className="app-shell">
        <Navbar />

        <main className="hero-layout">
          <section className="hero">
            <div className="logo-circle">
              <FaHospitalAlt />
            </div>

            <h1>ICU Orchestrator</h1>

            <p>
              Smart emergency platform to find nearby ICU beds, oxygen,
              ventilators and hospital support in real time.
            </p>

            <div className="hero-stats">
              <div>
                <strong>24/7</strong>
                <span>Emergency Support</span>
              </div>

              <div>
                <strong>Live</strong>
                <span>Hospital Availability</span>
              </div>
            </div>

            <button onClick={() => setShowHospitals(true)}>
              Find Emergency ICU
            </button>
          </section>

          <RequestForm onSearch={() => setShowHospitals(true)} />
        </main>

        {showHospitals && (
          <>
            <StatusTracker />
            <LiveMap />
            <AmbulanceTracker />
            <HospitalDashboard />

            <section className="hospital-section">
              <h2>Available Hospitals</h2>

              <div className="hospital-list">
                {hospitals.map((hospital) => (
                  <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;