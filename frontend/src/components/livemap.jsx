function LiveMap() {
  return (
    <div className="map-section">
      <h2>Nearby Hospital Map</h2>
      <p>Live location preview for nearby emergency care centers.</p>

      <iframe
        title="Nearby Hospitals Map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=77.35%2C28.60%2C77.50%2C28.75&layer=mapnik"
      ></iframe>
    </div>
  );
}

export default LiveMap;