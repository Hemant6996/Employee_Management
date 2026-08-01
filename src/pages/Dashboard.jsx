import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="page-shell">
      <div className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Team overview</p>
            <h2 className="page-title">Welcome back, {user?.name || "there"}</h2>
            <p className="page-subtitle">
              Keep your workspace organized with a clearer view of employee information.
            </p>
          </div>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {user && (
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Signed in as</p>
              <p className="stat-value">{user.name}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Access level</p>
              <p className="stat-value">{user.role}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Status</p>
              <p className="stat-value">Active</p>
            </div>
          </div>
        )}

        <div className="actions-inline">
          <Link className="btn btn-primary" to="/employees">
            View Employees
          </Link>
          {user?.role === "admin" && (
            <Link className="btn btn-secondary" to="/employees/create">
              Create Employee
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;