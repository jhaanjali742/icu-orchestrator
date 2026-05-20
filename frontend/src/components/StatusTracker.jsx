function StatusTracker() {
  return (
    <div className="status-box">
      <h2>Request Status</h2>

      <p>Your emergency request has been sent to nearby hospitals.</p>

      <div className="status-step active">1. Request Sent</div>
      <div className="status-step">2. Waiting for Hospital Response</div>
      <div className="status-step">3. Hospital Accepted</div>
    </div>
  );
}

export default StatusTracker;