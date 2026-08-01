import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import api from "../api/axios";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    salary: "",
  });
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: employee,
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.position) {
        errors.position = "Required";
      }
      if (!values.salary) {
        errors.salary = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await api.put(`/employees/${id}`, {
          ...values,
          salary: Number(values.salary),
        });
        navigate("/employees");
      } catch (error) {
        alert("Update failed");
      }
    },
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get("/employees");
        const emp = res.data.find((e) => e._id === id);
        setEmployee(emp || { name: "", position: "", salary: "" });
      } catch (error) {
        console.log("Error loading employee");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <div className="auth-page"><div className="auth-card">Loading...</div></div>;

  return (
    <div className="page-shell">
      <div className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Update details</p>
            <h2 className="page-title">Edit employee</h2>
            <p className="page-subtitle">Adjust employee information without losing context.</p>
          </div>
        </div>

        <form className="form-stack" onSubmit={formik.handleSubmit}>
          <div className="field-group">
            <label className="field-label">Full name</label>
            <input
              className="input"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter employee name"
              required
            />
            {formik.touched.name && formik.errors.name && <div className="error-text">{formik.errors.name}</div>}
          </div>

          <div className="field-group">
            <label className="field-label">Position</label>
            <input
              className="input"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter position"
              required
            />
            {formik.touched.position && formik.errors.position && (
              <div className="error-text">{formik.errors.position}</div>
            )}
          </div>

          <div className="field-group">
            <label className="field-label">Salary</label>
            <input
              className="input"
              name="salary"
              type="number"
              min="0"
              step="0.01"
              value={formik.values.salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter salary"
              required
            />
            {formik.touched.salary && formik.errors.salary && <div className="error-text">{formik.errors.salary}</div>}
          </div>

          <button className="btn btn-primary" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
