import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="top-nav">
      <Link to="/dashboard" className="brand">
        <span className="brand-mark">E</span>
        Employee Hub
      </Link>

      {user ? (
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/employees" className="nav-link">Employees</Link>

          {user.role === "admin" && (
            <Link to="/employees/create" className="nav-link">
              Create Employee
            </Link>
          )}

          <button className="btn btn-secondary small nav-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;