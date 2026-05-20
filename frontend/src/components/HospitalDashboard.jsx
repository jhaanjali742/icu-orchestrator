function HospitalDashboard() {
  return (
    <div className="dashboard-box">
      <h2>Hospital Dashboard</h2>
      <p>Update live hospital resource availability.</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>ICU Beds</h3>
          <strong>12</strong>
          <span>Available</span>
        </div>

        <div className="dashboard-card">
          <h3>Oxygen</h3>
          <strong>78%</strong>
          <span>Stock Level</span>
        </div>

        <div className="dashboard-card">
          <h3>Ventilators</h3>
          <strong>6</strong>
          <span>Available</span>
        </div>

        <div className="dashboard-card">
          <h3>Requests</h3>
          <strong>4</strong>
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
}

export default HospitalDashboard;