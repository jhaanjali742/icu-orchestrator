function AmbulanceTracker() {
  return (
    <div className="tracker-box">
      <h2>Ambulance Tracker</h2>

      <p>Emergency ambulance has been dispatched.</p>

      <div className="tracker-status">
        🚑 Ambulance arriving in approximately 6 minutes
      </div>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <div className="tracker-details">
        <div>
          <strong>Driver</strong>
          <span>Rahul Sharma</span>
        </div>

        <div>
          <strong>Vehicle ID</strong>
          <span>DL-01-EM-4421</span>
        </div>

        <div>
          <strong>Status</strong>
          <span>On The Way</span>
        </div>
      </div>
    </div>
  );
}

export default AmbulanceTracker;