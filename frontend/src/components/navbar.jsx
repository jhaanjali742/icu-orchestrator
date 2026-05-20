import { FaHospitalAlt } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="brand">

        <span className="brand-icon">
          <FaHospitalAlt />
        </span>

        <h2>ICU Orchestrator</h2>

      </div>

      <div className="nav-links">

        <a href="#">Home</a>

        <a href="#">
          Emergency Request
        </a>

        <a href="#">
          Hospital Dashboard
        </a>

      </div>

    </nav>
  );
}

export default Navbar;