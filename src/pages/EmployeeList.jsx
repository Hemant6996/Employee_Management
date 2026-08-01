import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (error) {
      console.log("Error fetching employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="page-shell">
      <div className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Directory</p>
            <h2 className="page-title">Employee list</h2>
            <p className="page-subtitle">Review and manage your employee records in one place.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/employees/create")}>
            Add employee
          </button>
        </div>

        <div className="employee-list">
          {employees.map((emp) => (
            <div className="employee-card" key={emp._id}>
              <div className="employee-meta">
                <h3 className="employee-name">{emp.name}</h3>
                <p className="employee-role">{emp.position}</p>
              </div>
              <div className="salary-badge">₹{emp.salary}</div>
              <div className="actions-inline">
                <button className="btn btn-secondary small" onClick={() => navigate(`/employees/edit/${emp._id}`)}>
                  Edit
                </button>
                <button className="btn btn-danger small" onClick={() => handleDelete(emp._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;